import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");

import { generateWallet, generateNewAccount } from "@stacks/wallet-sdk";
import {
  makeContractCall,
  makeSTXTokenTransfer,
  broadcastTransaction,
  AnchorMode,
  TransactionVersion,
  PostConditionMode,
  getAddressFromPrivateKey,
  standardPrincipalCV,
  uintCV,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";
import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "../.env");
try {
  const lines = readFileSync(envPath, "utf8").split("\n");
  for (const line of lines) {
    const [key, ...rest] = line.split("=");
    if (key && rest.length) process.env[key.trim()] = rest.join("=").trim();
  }
} catch {}

// --- CONFIG ---
const CONTRACT_ADDRESS = "SP19AHC15QDZJPDHTF5WQWKKZC6RE38W9D6VC56EH";
const CONTRACT_NAME    = "stx-bouncer";
const network          = new StacksMainnet();

const MNEMONIC = process.env.STACKS_MNEMONIC ?? "";
if (!MNEMONIC) {
  console.error("Set STACKS_MNEMONIC in .env (your 12/24-word seed phrase).");
  process.exit(1);
}

// --- AMOUNTS ---
// Phase 1 uses a plain STX transfer (not a contract call) — far cheaper fee.
// Phase 2 uses a contract call (tip) — this is what generates the DAU signal.
const FUND_FEE         = 800n;   // µSTX fee for Phase 1 plain transfer — 200 was too low and got dropped
const TX_FEE           = 1000n;  // µSTX fee for Phase 2 contract call (mainnet median)
const returnAmount     = 1n;     // µSTX returned in Phase 2 — minimum nonzero
const distributeAmount = returnAmount + TX_FEE + 500n; // 1501 µSTX (funds Phase 2 + safe buffer)

// --- SCALE CONFIG ---
// Each sub-wallet = 1 unique DAU. Raise NUM_ACCOUNTS to increase daily DAU.
// Cost per run ≈ NUM_ACCOUNTS * (distributeAmount + FUND_FEE) / 1_000_000 STX
//   500 accounts ≈ 0.65 STX/run  |  1000 accounts ≈ 1.30 STX/run
const NUM_ACCOUNTS = 1000;
const CYCLES       = 1;

// Phase 1 (master → subs) is batched to stay under Stacks' ~25-tx mempool limit per account.
// Phase 2 (subs → master) is fully parallel — each sub is a distinct sender.
const BATCH_SIZE      = 20;   // P1 txs in flight before waiting for confirmations
const P2_CONCURRENCY  = 50;   // P2 parallel senders per wave (each is a different address)
const TX_DELAY_MS     = 3000; // small delay between P1 batches to avoid rate limits

// --- NONCE CACHE ---
const nonceCache = new Map();

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchNonce(address, attempt = 0) {
  if (nonceCache.has(address)) return nonceCache.get(address);
  const res = await fetch(`https://api.hiro.so/extended/v1/address/${address}/nonces`);
  if (res.status === 429) {
    const wait = 15_000 * (attempt + 1);
    console.log(`  Rate limited — waiting ${wait / 1000}s`);
    await sleep(wait);
    return fetchNonce(address, attempt + 1);
  }
  if (!res.ok) throw new Error(`Nonce fetch failed for ${address}: ${res.status}`);
  const { possible_next_nonce } = await res.json();
  const nonce = BigInt(possible_next_nonce);
  nonceCache.set(address, nonce);
  return nonce;
}

async function waitForConfirmation(txid, pollMs = 30_000, timeoutMs = 1_200_000) {
  const deadline = Date.now() + timeoutMs;
  console.log(`  Waiting: ${txid.slice(0, 20)}…`);
  while (Date.now() < deadline) {
    try {
      const res  = await fetch(`https://api.hiro.so/extended/v1/tx/${txid}`);
      if (res.status === 429) { await sleep(20_000); continue; }
      const data = await res.json();
      if (data.tx_status === "success") { console.log(`  Confirmed.`); return { ok: true }; }
      if (data.tx_status?.startsWith("abort")) {
        const result = data.tx_result?.repr ?? data.tx_result?.value ?? "(unknown)";
        console.error(`  Aborted: ${result}`);
        return { ok: false, aborted: true, reason: result };
      }
      console.log(`  ${data.tx_status || "pending"} — retry in ${pollMs / 1000}s`);
    } catch (e) {
      console.error(`  Poll error: ${e.message}`);
    }
    await sleep(pollMs);
  }
  console.error(`  Timed out: ${txid}`);
  return { ok: false, timedOut: true };
}

async function fetchBalance(address) {
  try {
    const res  = await fetch(`https://api.hiro.so/extended/v1/address/${address}/stx`);
    const data = await res.json();
    return BigInt(data.balance ?? 0);
  } catch {
    return 0n;
  }
}

// Plain STX transfer — used in Phase 1 to fund sub-wallets cheaply.
// Does NOT call the contract so it doesn't count as a DAU interaction,
// but the master is only 1 DAU anyway vs 500 from the subs.
async function fundWallet(senderKey, recipientAddress, amount, label) {
  const senderAddress = getAddressFromPrivateKey(senderKey, TransactionVersion.Mainnet);
  const nonce = await fetchNonce(senderAddress);
  try {
    const tx = await makeSTXTokenTransfer({
      recipient: recipientAddress,
      amount,
      senderKey,
      network,
      nonce,
      fee: FUND_FEE,
      anchorMode: AnchorMode.Any,
    });
    const res = await broadcastTransaction(tx, network);
    if (res.error) {
      const reason = res.reason ?? res.error;
      console.log(`  ${label} ✗ | ${reason}`);
      if (reason === "ConflictingNonceInMempool") nonceCache.set(senderAddress, nonce + 1n);
      if (reason === "BadNonce") nonceCache.delete(senderAddress);
      return null;
    }
    console.log(`  ${label} ✓ | ${res.txid.slice(0, 20)}…`);
    nonceCache.set(senderAddress, nonce + 1n);
    return res.txid;
  } catch (err) {
    console.log(`  ${label} ✗ | ${err.message}`);
    return null;
  }
}

async function sendTip(senderKey, recipientAddress, amount, label) {
  const senderAddress = getAddressFromPrivateKey(senderKey, TransactionVersion.Mainnet);
  const nonce = await fetchNonce(senderAddress);
  try {
    const tx = await makeContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "tip",
      functionArgs: [standardPrincipalCV(recipientAddress), uintCV(amount)],
      senderKey,
      network,
      nonce,
      fee: TX_FEE,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    });
    const res = await broadcastTransaction(tx, network);
    if (res.error) {
      const reason = res.reason ?? res.error;
      console.log(`  ${label} ✗ | ${reason}`);
      if (reason === "ConflictingNonceInMempool") nonceCache.set(senderAddress, nonce + 1n);
      if (reason === "BadNonce") nonceCache.delete(senderAddress);
      return null;
    }
    console.log(`  ${label} ✓ | ${res.txid.slice(0, 20)}…`);
    nonceCache.set(senderAddress, nonce + 1n);
    return res.txid;
  } catch (err) {
    console.log(`  ${label} ✗ | ${err.message}`);
    return null;
  }
}

async function sendWithRetry(senderKey, recipientAddress, amount, label, maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    if (attempt > 1) {
      const addr = getAddressFromPrivateKey(senderKey, TransactionVersion.Mainnet);
      nonceCache.delete(addr);
      console.log(`  Retry ${attempt}/${maxRetries} for ${label}…`);
      await sleep(20_000);
    }
    const txid = await sendTip(senderKey, recipientAddress, amount, label);
    if (!txid) continue;
    const result = await waitForConfirmation(txid);
    if (result.ok) return true;
    if (result.aborted) {
      if (result.reason === "(err u1)") { await sleep(30_000); continue; }
      return false;
    }
  }
  return false;
}

// --- MAIN ---

async function run() {
  console.log(`\n${"━".repeat(60)}`);
  console.log(`Contract  : ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`Accounts  : 1 master + ${NUM_ACCOUNTS} sub-wallets`);
  console.log(`DAU/run   : ~${NUM_ACCOUNTS + 1} unique addresses`);
  console.log(`TXs/cycle : ${NUM_ACCOUNTS * 2}`);
  console.log(`P1 batch  : ${BATCH_SIZE} | P2 concurrency: ${P2_CONCURRENCY}`);
  console.log(`${"━".repeat(60)}\n`);

  console.log("Deriving wallets…");
  let wallet = await generateWallet({ secretKey: MNEMONIC, password: "" });
  while (wallet.accounts.length <= NUM_ACCOUNTS) {
    wallet = generateNewAccount(wallet);
  }

  const account0    = wallet.accounts[1];
  const acc0Key     = account0.stxPrivateKey;
  const acc0Address = getAddressFromPrivateKey(acc0Key, TransactionVersion.Mainnet);

  console.log(`Master : ${acc0Address}`);

  await fetchNonce(acc0Address);
  const balance = await fetchBalance(acc0Address);
  const needed  = BigInt(NUM_ACCOUNTS) * (distributeAmount + FUND_FEE);
  console.log(`Balance : ${(Number(balance) / 1_000_000).toFixed(4)} STX`);
  console.log(`Needed  : ${(Number(needed)  / 1_000_000).toFixed(4)} STX\n`);
  if (balance < needed) {
    console.error(`Insufficient balance. Need ${(Number(needed) / 1_000_000).toFixed(4)} STX, have ${(Number(balance) / 1_000_000).toFixed(4)} STX.`);
    process.exit(1);
  }

  for (let cycle = 1; cycle <= CYCLES; cycle++) {
    console.log(`\n${"─".repeat(60)}\nCycle ${cycle}/${CYCLES}\n${"─".repeat(60)}`);

    // ── Phase 1: master → sub-wallets (batched, serial per batch) ──────────
    // Master is one account so we can only have BATCH_SIZE txs in-flight at once
    // to stay under Stacks' mempool chaining limit.
    console.log(`\nPhase 1 — distributing to ${NUM_ACCOUNTS} sub-wallets (batch=${BATCH_SIZE})…`);
    let p1Failures = 0;

    for (let batchStart = 1; batchStart <= NUM_ACCOUNTS; batchStart += BATCH_SIZE) {
      const batchEnd = Math.min(batchStart + BATCH_SIZE - 1, NUM_ACCOUNTS);
      console.log(`  Batch ${batchStart}–${batchEnd}`);

      const batchResults = [];
      for (let i = batchStart; i <= batchEnd; i++) {
        const recipientAddress = getAddressFromPrivateKey(
          wallet.accounts[i].stxPrivateKey,
          TransactionVersion.Mainnet
        );
        const txid = await fundWallet(acc0Key, recipientAddress, distributeAmount, `[P1 ${i}]`);
        batchResults.push({ i, txid });
      }

      // Wait for the whole batch before starting the next one
      for (const { i, txid } of batchResults) {
        if (!txid) { p1Failures++; continue; }
        const result = await waitForConfirmation(txid);
        if (!result.ok) p1Failures++;
      }

      if (batchEnd < NUM_ACCOUNTS) await sleep(TX_DELAY_MS);
    }

    console.log(`Phase 1 done — ${NUM_ACCOUNTS - p1Failures}/${NUM_ACCOUNTS} succeeded.`);

    // Verify all sub-wallets actually received funds before Phase 2.
    // Low-fee Phase 1 txs can appear confirmed via API but still be dropped on-chain.
    console.log(`\nVerifying sub-wallet balances…`);
    let fundingGaps = 0;
    const needed = returnAmount + TX_FEE;
    await Promise.all(
      Array.from({ length: NUM_ACCOUNTS }, async (_, idx) => {
        const i = idx + 1;
        const addr = getAddressFromPrivateKey(wallet.accounts[i].stxPrivateKey, TransactionVersion.Mainnet);
        const bal  = await fetchBalance(addr);
        if (bal < needed) {
          console.error(`  ⚠ Account ${i} has ${bal} µSTX — below ${needed} µSTX needed. Phase 1 TX may not have landed.`);
          fundingGaps++;
        }
      })
    );
    if (fundingGaps > 0) {
      console.error(`\n  ${fundingGaps} wallets underfunded — re-run the script to retry Phase 1 for them.`);
    } else {
      console.log(`  All wallets funded ✓`);
    }

    // Clear sub-wallet nonce cache before Phase 2
    for (let i = 1; i <= NUM_ACCOUNTS; i++) {
      nonceCache.delete(getAddressFromPrivateKey(wallet.accounts[i].stxPrivateKey, TransactionVersion.Mainnet));
    }

    // ── Phase 2: sub-wallets → master (fully parallel, wave-by-wave) ───────
    // Each sub-wallet is a distinct sender — no chaining constraint between them.
    // Fire P2_CONCURRENCY at once, wait for the wave, then fire the next wave.
    console.log(`\nPhase 2 — ${NUM_ACCOUNTS} sub-wallets returning to master (concurrency=${P2_CONCURRENCY})…`);
    let p2Failures = 0;

    for (let waveStart = 1; waveStart <= NUM_ACCOUNTS; waveStart += P2_CONCURRENCY) {
      const waveEnd = Math.min(waveStart + P2_CONCURRENCY - 1, NUM_ACCOUNTS);
      console.log(`  Wave ${waveStart}–${waveEnd}`);

      const waveTasks = [];
      for (let i = waveStart; i <= waveEnd; i++) {
        const subKey     = wallet.accounts[i].stxPrivateKey;
        const subAddress = getAddressFromPrivateKey(subKey, TransactionVersion.Mainnet);
        waveTasks.push(
          fetchBalance(subAddress).then(async (bal) => {
            if (bal < returnAmount + TX_FEE) {
              console.log(`  [P2 ${i}] ⚠ skipped — insufficient balance`);
              return false;
            }
            return sendWithRetry(subKey, acc0Address, returnAmount, `[P2 ${i}]`);
          })
        );
      }

      const results = await Promise.all(waveTasks);
      p2Failures += results.filter((r) => !r).length;
    }

    const totalOk = (NUM_ACCOUNTS - p1Failures) + (NUM_ACCOUNTS - p2Failures);
    console.log(`\nCycle ${cycle} done — ${totalOk}/${NUM_ACCOUNTS * 2} interactions succeeded.`);
    if (p1Failures + p2Failures > 0) {
      console.log(`  Failures: P1=${p1Failures}, P2=${p2Failures}`);
    }
  }

  const totalTx      = CYCLES * NUM_ACCOUNTS * 2;
  const p1FeeTotal   = CYCLES * NUM_ACCOUNTS * Number(FUND_FEE);
  const p2FeeTotal   = CYCLES * NUM_ACCOUNTS * Number(TX_FEE);
  const totalFeesStx = (p1FeeTotal + p2FeeTotal) / 1_000_000;
  console.log(`\n${"━".repeat(60)}`);
  console.log(`Done — ${totalTx} total TXs, ~${NUM_ACCOUNTS} DAU/run`);
  console.log(`Fees burned: ~${totalFeesStx.toFixed(4)} STX (P1 ${(p1FeeTotal/1e6).toFixed(4)} + P2 ${(p2FeeTotal/1e6).toFixed(4)})`);
  console.log(`${"━".repeat(60)}\n`);
}

run().catch(console.error);
