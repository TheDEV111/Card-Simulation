import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");

import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  uintCV,
  PostConditionMode,
  getAddressFromPrivateKey,
  TransactionVersion,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

// --- CONFIG ---
const network = new StacksMainnet();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ?? "SPQG93AEB9GACWCPZ92Z6FB440HX1CNP4ADT8S0X";
const CONTRACT_NAME = "card-game-v2";

const PRIVATE_KEYS = (process.env.PRIVATE_KEYS ?? "").split(",").filter(Boolean);

if (PRIVATE_KEYS.length === 0) {
  console.error("Set PRIVATE_KEYS: comma-separated mainnet private keys.");
  process.exit(1);
}

// --- SETTINGS ---
// Each wallet needs ~0.5 STX: (TOTAL_TX / keys) × (0.002 fee + 0.001 stake)
const TOTAL_TX       = 200;
const BATCH_SIZE     = 24;       // max safe unconfirmed per address
const BLOCK_WAIT_MS  = 660_000;  // 11 min — wait for block confirmation between batches
const TX_DELAY_MS    = 300;      // ms between individual sends within a batch
const FIXED_STAKE    = 1000;     // 0.001 STX

// --- HELPERS ---

function getRandomCard() {
  return Math.floor(Math.random() * 3) + 1;
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchNonce(address, attempt = 0) {
  const res = await fetch(`https://api.hiro.so/extended/v1/address/${address}/nonces`);
  if (res.status === 429) {
    const wait = 15_000 * (attempt + 1);
    console.log(`  ⏳ Rate limited — waiting ${wait / 1000}s`);
    await sleep(wait);
    return fetchNonce(address, attempt + 1);
  }
  if (!res.ok) throw new Error(`Nonce fetch failed for ${address}: ${res.status}`);
  const { possible_next_nonce } = await res.json();
  return possible_next_nonce;
}

async function broadcast(tx) {
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      const res = await broadcastTransaction(tx, network);
      return res;
    } catch {
      if (attempt < 3) await sleep(8_000 * (attempt + 1));
    }
  }
  throw new Error("broadcast failed after retries");
}

// Send one TX from a wallet, returns { ok, nonceConsumed }
async function sendOne(key, nonce, label) {
  const card = getRandomCard();
  try {
    const tx = await makeContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: "play",
      functionArgs: [uintCV(card), uintCV(FIXED_STAKE)],
      senderKey: key,
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      nonce,
      fee: 2000,
    });

    const res = await broadcast(tx);

    if (res.error) {
      const reason = res.reason ?? res.error;
      console.log(`  ${label} ✗ card=${card} | ${reason}`);
      const isConflict = reason === "ConflictingNonceInMempool";
      const isBad      = reason === "BadNonce";
      return { ok: false, isConflict, isBad };
    }

    console.log(`  ${label} ✓ card=${card} | ${res.txid.slice(0, 16)}…`);
    return { ok: true };
  } catch (err) {
    console.log(`  ${label} ✗ ${err.message}`);
    return { ok: false, isConflict: false, isBad: false };
  }
}

// Send a batch of up to BATCH_SIZE TXs from one wallet, returns number sent
async function sendBatch(key, nonce, batchIndex, walletLabel) {
  let sent = 0;
  let currentNonce = nonce;

  for (let i = 0; i < BATCH_SIZE; i++) {
    const label = `[${walletLabel} batch=${batchIndex + 1} tx=${i + 1}/${BATCH_SIZE}]`;
    const { ok, isConflict, isBad } = await sendOne(key, currentNonce, label);

    if (ok) {
      sent++;
      currentNonce++;
    } else if (isConflict) {
      currentNonce++; // skip stuck mempool slot
    } else if (isBad) {
      // Nonce too low — re-fetch and continue
      const address = getAddressFromPrivateKey(key, TransactionVersion.Mainnet);
      currentNonce = await fetchNonce(address);
    }

    if (i < BATCH_SIZE - 1) await sleep(TX_DELAY_MS);
  }

  return sent;
}

// --- RUN ---

async function run() {
  const addresses = PRIVATE_KEYS.map((k) =>
    getAddressFromPrivateKey(k, TransactionVersion.Mainnet)
  );

  console.log(`\n${"━".repeat(50)}`);
  console.log(`Target : ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`Wallets: ${PRIVATE_KEYS.length}`);
  console.log(`Goal   : ${TOTAL_TX} TXs`);
  console.log(`Strategy: ${BATCH_SIZE} TXs/wallet/block, ~${Math.ceil(TOTAL_TX / (BATCH_SIZE * PRIVATE_KEYS.length))} rounds`);
  console.log(`${"━".repeat(50)}\n`);

  // Fetch starting nonces
  const nonces = {};
  for (let i = 0; i < PRIVATE_KEYS.length; i++) {
    nonces[PRIVATE_KEYS[i]] = await fetchNonce(addresses[i]);
    console.log(`Wallet ${i + 1}: ${addresses[i]} — nonce ${nonces[PRIVATE_KEYS[i]]}`);
  }
  console.log();

  let totalSent = 0;
  let round = 0;

  while (totalSent < TOTAL_TX) {
    console.log(`\n${"─".repeat(50)}`);
    console.log(`Round ${round + 1} — ${totalSent}/${TOTAL_TX} sent so far`);
    console.log(`${"─".repeat(50)}`);

    // Send batches from all wallets in parallel
    const results = await Promise.all(
      PRIVATE_KEYS.map((key, i) =>
        sendBatch(key, nonces[key], round, `W${i + 1}`)
      )
    );

    const roundSent = results.reduce((a, b) => a + b, 0);
    totalSent += roundSent;

    // Advance nonces by batch size (approximate — re-fetch before next round)
    PRIVATE_KEYS.forEach((key) => { nonces[key] += BATCH_SIZE; });

    console.log(`\nRound ${round + 1} complete — sent ${roundSent}, total ${totalSent}/${TOTAL_TX}`);
    round++;

    if (totalSent < TOTAL_TX) {
      console.log(`\n⏳ Waiting ${BLOCK_WAIT_MS / 60_000} min for block confirmation...\n`);
      await sleep(BLOCK_WAIT_MS);

      // Re-fetch nonces after block confirms
      for (let i = 0; i < PRIVATE_KEYS.length; i++) {
        nonces[PRIVATE_KEYS[i]] = await fetchNonce(addresses[i]);
        console.log(`Wallet ${i + 1} refreshed nonce: ${nonces[PRIVATE_KEYS[i]]}`);
      }
    }
  }

  console.log(`\n${"━".repeat(50)}`);
  console.log(`✅ Done — ${totalSent} transactions sent to ${CONTRACT_NAME}`);
  console.log(`💸 Approx fees: ~${(totalSent * 0.002).toFixed(3)} STX`);
  console.log(`${"━".repeat(50)}\n`);
}

run();
