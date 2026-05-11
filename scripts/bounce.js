import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");

import { generateWallet, generateNewAccount } from "@stacks/wallet-sdk";
import {
  makeContractCall,
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

// Load .env from project root (no dotenv dependency needed)
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
// tip() routes STX: caller -> contract -> recipient, costing 2 transfers
// distributeAmount: what Account 0 sends to each sub-wallet
// returnAmount: what each sub-wallet sends back to Account 0
// Each sub-wallet needs: returnAmount + TX_FEE to execute Phase 2
const TX_FEE           = 1500n;   // µSTX fee per contract call — mainnet median is ~1000, 1500 is safe floor
const returnAmount     = 1000n;   // µSTX returned to Account 0 in Phase 2
const distributeAmount = returnAmount + TX_FEE + 500n; // 3000 µSTX (returnAmount + fee + 500 buffer)

// Number of sub-accounts to use (Phase 1: 1 TX each, Phase 2: 1 TX each = NUM_ACCOUNTS * 2 total TXs)
const NUM_ACCOUNTS = 20; // 10 × 2 = 20 contract interactions per cycle
const CYCLES       = 1;  // increase to repeat the full loop

const TX_DELAY_MS = 15000; // ms between sends within a phase — INCREASED to 15s to avoid TooMuchChaining

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
  console.log(`\n  Waiting for confirmation: ${txid.slice(0, 20)}...`);
  while (Date.now() < deadline) {
    try {
      const res  = await fetch(`https://api.hiro.so/extended/v1/tx/${txid}`);
      if (res.status === 429) {
        console.log(`  Rate limited — waiting 20s`);
        await sleep(20_000);
        continue;
      }
      const data = await res.json();
      if (data.tx_status === "success") {
        console.log(`  Confirmed.`);
        return { ok: true };
      }
      if (data.tx_status?.startsWith("abort")) {
        // Decode the Clarity result to show what the contract returned
        const result = data.tx_result?.repr ?? data.tx_result?.value ?? "(unknown)";
        const events = (data.events ?? []).map((e) => e.type).join(", ") || "none";
        console.error(`  Aborted: ${data.tx_status}`);
        console.error(`  Clarity result: ${result}`);
        console.error(`  Contract events: ${events}`);
        return { ok: false, aborted: true, reason: result, status: data.tx_status };
      }
      console.log(`  Status: ${data.tx_status || "pending"} — rechecking in ${pollMs / 1000}s`);
    } catch (e) {
      console.error(`  Poll error: ${e.message}`);
    }
    await sleep(pollMs);
  }
  console.error(`  Timed out waiting for: ${txid}`);
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

// --- MAIN ---

async function run() {
  console.log(`\n${"━".repeat(55)}`);
  console.log(`Contract  : ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`Accounts  : 1 master + ${NUM_ACCOUNTS} sub-wallets`);
  console.log(`TXs/cycle : ${NUM_ACCOUNTS * 2} (${NUM_ACCOUNTS} distribute + ${NUM_ACCOUNTS} return)`);
  console.log(`Cycles    : ${CYCLES}`);
  console.log(`${"━".repeat(55)}\n`);

  // Derive wallets from mnemonic
  console.log("Deriving wallets from mnemonic...");
  let wallet = await generateWallet({ secretKey: MNEMONIC, password: "" });
  while (wallet.accounts.length <= NUM_ACCOUNTS) {
    wallet = generateNewAccount(wallet);
  }

  const account0     = wallet.accounts[1]; // Account 2 (index 1) = SP19AHC15QDZJPDHTF5WQWKKZC6RE38W9D6VC56EH
  const acc0Key      = account0.stxPrivateKey;
  const acc0Address  = getAddressFromPrivateKey(acc0Key, TransactionVersion.Mainnet);

  console.log(`Master wallet (Account 0): ${acc0Address}`);
  console.log(`Sub-wallets: Account 1 — Account ${NUM_ACCOUNTS}\n`);

  // Pre-fetch Account 0 nonce + balance
  await fetchNonce(acc0Address);
  const balance = await fetchBalance(acc0Address);
  const needed  = BigInt(NUM_ACCOUNTS) * (distributeAmount + TX_FEE);
  console.log(`Master balance : ${balance} µSTX (${(Number(balance) / 1_000_000).toFixed(4)} STX)`);
  console.log(`Estimated cost : ${needed} µSTX (${(Number(needed) / 1_000_000).toFixed(4)} STX)\n`);
  if (balance < needed) {
    console.error(`Insufficient balance. Need at least ${needed} µSTX, have ${balance} µSTX.`);
    process.exit(1);
  }

  const MAX_RETRIES = 3;

  async function sendWithRetry(senderKey, recipientAddress, amount, label) {
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      if (attempt > 1) {
        console.log(`  Retry ${attempt}/${MAX_RETRIES} for ${label} — waiting 20s...`);
        // Re-fetch nonce on retry to avoid stale cache after an abort
        const addr = getAddressFromPrivateKey(senderKey, TransactionVersion.Mainnet);
        nonceCache.delete(addr);
        await sleep(20_000);
      }

      const txid = await sendTip(senderKey, recipientAddress, amount, label);
      if (!txid) {
        console.error(`  Broadcast failed (attempt ${attempt})`);
        continue;
      }

      const result = await waitForConfirmation(txid);
      if (result.ok) return true;

      if (result.aborted) {
        console.error(`  Contract aborted with: ${result.reason}`);
        // (err u1) = stx-transfer? insufficient balance — worth retrying after a delay
        // (err u2) = sender == recipient, (err u3) = zero amount — never retry these
        if (result.reason === "(err u1)") {
          console.error(`  Insufficient balance on sender — retrying after 30s delay`);
          await sleep(30_000);
          continue;
        }
        console.error(`  Non-retryable contract abort — skipping this TX`);
        return false;
      }

      if (result.timedOut) {
        console.error(`  TX timed out (attempt ${attempt})`);
        continue;
      }
    }
    return false;
  }

  for (let cycle = 1; cycle <= CYCLES; cycle++) {
    console.log(`\n${"─".repeat(55)}`);
    console.log(`Cycle ${cycle}/${CYCLES}`);
    console.log(`${"─".repeat(55)}`);

    // Phase 1: Account 0 tips sub-wallets
    console.log(`\nPhase 1 — distributing ${distributeAmount} µSTX to ${NUM_ACCOUNTS} sub-wallets...`);
    let p1Failures = 0;
    for (let i = 1; i <= NUM_ACCOUNTS; i++) {
      const recipientAddress = getAddressFromPrivateKey(
        wallet.accounts[i].stxPrivateKey,
        TransactionVersion.Mainnet
      );
      const ok = await sendWithRetry(
        acc0Key,
        recipientAddress,
        distributeAmount,
        `[C${cycle} P1 ${i}/${NUM_ACCOUNTS}]`
      );
      if (!ok) {
        p1Failures++;
        console.error(`  ⚠ TX ${i} failed after retries — continuing with remaining wallets`);
      }
      if (i < NUM_ACCOUNTS) await sleep(TX_DELAY_MS);
    }

    console.log(`\nPhase 1 complete (${NUM_ACCOUNTS - p1Failures}/${NUM_ACCOUNTS} succeeded). Clearing nonce cache...`);
    for (let i = 1; i <= NUM_ACCOUNTS; i++) {
      const addr = getAddressFromPrivateKey(wallet.accounts[i].stxPrivateKey, TransactionVersion.Mainnet);
      nonceCache.delete(addr);
    }

    // Phase 2: Sub-wallets tip back to Account 0
    console.log(`\nPhase 2 — sub-wallets returning ${returnAmount} µSTX to master...`);
    let p2Failures = 0;
    for (let i = 1; i <= NUM_ACCOUNTS; i++) {
      const subBalance = await fetchBalance(
        getAddressFromPrivateKey(wallet.accounts[i].stxPrivateKey, TransactionVersion.Mainnet)
      );
      if (subBalance < returnAmount + TX_FEE) {
        console.log(`  [C${cycle} P2 ${i}/${NUM_ACCOUNTS}] ⚠ Skipped — insufficient balance (${subBalance} µSTX)`);
        p2Failures++;
        continue;
      }

      const ok = await sendWithRetry(
        wallet.accounts[i].stxPrivateKey,
        acc0Address,
        returnAmount,
        `[C${cycle} P2 ${i}/${NUM_ACCOUNTS}]`
      );
      if (!ok) {
        p2Failures++;
        console.error(`  ⚠ Phase 2 TX ${i} failed after retries — continuing`);
      }
      if (i < NUM_ACCOUNTS) await sleep(TX_DELAY_MS);
    }

    const totalSucceeded = (NUM_ACCOUNTS - p1Failures) + (NUM_ACCOUNTS - p2Failures);
    console.log(`\nCycle ${cycle} complete — ${totalSucceeded}/${NUM_ACCOUNTS * 2} contract interactions succeeded.`);
    if (p1Failures + p2Failures > 0) {
      console.log(`  Failures: ${p1Failures} in Phase 1, ${p2Failures} in Phase 2`);
    }
  }

  const totalTx = CYCLES * NUM_ACCOUNTS * 2;
  console.log(`\n${"━".repeat(55)}`);
  console.log(`Done -- ${totalTx} total transactions`);
  console.log(`Approx fees: ~${(totalTx * Number(TX_FEE) / 1_000_000).toFixed(4)} STX`);
  console.log(`${"━".repeat(55)}\n`);
}

run().catch(console.error);
