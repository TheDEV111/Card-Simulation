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

// Load .env from project root
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
const CONTRACT_ADDRESS = "SPQG93AEB9GACWCPZ92Z6FB440HX1CNP4ADT8S0X";
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
const TX_FEE           = 15000n;  // µSTX fee per contract call — INCREASED for reliability
const returnAmount     = 1000n;   // µSTX returned to Account 0 in Phase 2
const distributeAmount = returnAmount + TX_FEE + 500n; // 16500 µSTX (buffer covers tip's internal transfer)

// Number of sub-accounts to use (Phase 1: 1 TX each, Phase 2: 1 TX each = NUM_ACCOUNTS * 2 total TXs)
const NUM_ACCOUNTS = 2; // 2 × 2 = 4 contract interactions per cycle (testing with 2 transactions)
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
      const data = await res.json();
      if (data.tx_status === "success") {
        console.log(`  Confirmed.`);
        return true;
      }
      if (data.tx_status?.startsWith("abort")) {
        console.error(`  Aborted: ${data.tx_status}`);
        return false;
      }
      console.log(`  Status: ${data.tx_status || "pending"} — rechecking in ${pollMs / 1000}s`);
    } catch (e) {
      console.error(`  Poll error: ${e.message}`);
    }
    await sleep(pollMs);
  }
  console.error(`  Timed out waiting for: ${txid}`);
  return false;
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

  const account0     = wallet.accounts[0];
  const acc0Key      = account0.stxPrivateKey;
  const acc0Address  = getAddressFromPrivateKey(acc0Key, TransactionVersion.Mainnet);

  console.log(`Master wallet (Account 0): ${acc0Address}`);
  console.log(`Sub-wallets: Account 1 — Account ${NUM_ACCOUNTS}\n`);

  // Pre-fetch Account 0 nonce
  await fetchNonce(acc0Address);

  for (let cycle = 1; cycle <= CYCLES; cycle++) {
    console.log(`\n${"─".repeat(55)}`);
    console.log(`Cycle ${cycle}/${CYCLES}`);
    console.log(`${"─".repeat(55)}`);

    // Phase 1: Account 0 tips sub-wallets
    console.log(`\nPhase 1 — distributing ${distributeAmount} µSTX to ${NUM_ACCOUNTS} sub-wallets...`);
    for (let i = 1; i <= NUM_ACCOUNTS; i++) {
      const recipientAddress = getAddressFromPrivateKey(
        wallet.accounts[i].stxPrivateKey,
        TransactionVersion.Mainnet
      );
      const txid = await sendTip(
        acc0Key,
        recipientAddress,
        distributeAmount,
        `[C${cycle} P1 ${i}/${NUM_ACCOUNTS}]`
      );
      if (txid) {
        const confirmed = await waitForConfirmation(txid);
        if (!confirmed) {
          console.error(`Phase 1 transaction ${i} failed to confirm. Stopping.`);
          process.exit(1);
        }
      } else {
        console.error(`Phase 1 transaction ${i} failed to broadcast. Stopping.`);
        process.exit(1);
      }
    }

    // Clear sub-wallet nonce cache before Phase 2
    console.log(`\nPhase 1 complete. Clearing nonce cache for Phase 2...`);
    for (let i = 1; i <= NUM_ACCOUNTS; i++) {
      const addr = getAddressFromPrivateKey(wallet.accounts[i].stxPrivateKey, TransactionVersion.Mainnet);
      nonceCache.delete(addr);
    }

    // Phase 2: Sub-wallets tip back to Account 0
    console.log(`\nPhase 2 — ${NUM_ACCOUNTS} sub-wallets returning ${returnAmount} µSTX to master...`);
    for (let i = 1; i <= NUM_ACCOUNTS; i++) {
      const txid = await sendTip(
        wallet.accounts[i].stxPrivateKey,
        acc0Address,
        returnAmount,
        `[C${cycle} P2 ${i}/${NUM_ACCOUNTS}]`
      );
      if (txid) {
        const confirmed = await waitForConfirmation(txid);
        if (!confirmed) {
          console.error(`Phase 2 transaction ${i} failed to confirm. Stopping.`);
          process.exit(1);
        }
      } else {
        console.error(`Phase 2 transaction ${i} failed to broadcast. Stopping.`);
        process.exit(1);
      }
    }

    console.log(`\nCycle ${cycle} complete — ${NUM_ACCOUNTS * 2} contract interactions generated.`);
  }

  const totalTx = CYCLES * NUM_ACCOUNTS * 2;
  console.log(`\n${"━".repeat(55)}`);
  console.log(`Done -- ${totalTx} total transactions`);
  console.log(`Approx fees: ~${(totalTx * Number(TX_FEE) / 1_000_000).toFixed(4)} STX`);
  console.log(`${"━".repeat(55)}\n`);
}

run().catch(console.error);
