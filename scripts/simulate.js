import {
  makeContractCall,
  broadcastTransaction,
  AnchorMode,
  uintCV,
  PostConditionMode,
} from "@stacks/transactions";
import { StacksTestnet } from "@stacks/network";

// --- CONFIG ---
const network = new StacksTestnet();

const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS ?? "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM";
const CONTRACT_NAME = "card-game";
const FUNCTION_NAME = "play";

// Add at least two testnet private keys here (hex, no 0x prefix)
const PRIVATE_KEYS = (process.env.PRIVATE_KEYS ?? "").split(",").filter(Boolean);

if (PRIVATE_KEYS.length === 0) {
  console.error("Set PRIVATE_KEYS env var: comma-separated testnet private keys.");
  process.exit(1);
}

// --- SETTINGS ---
const TOTAL_TX = 50;
const DELAY_MS = 3000; // 3 s between sends — respect cooldown blocks

// --- HELPERS ---

function getRandomCard() {
  return Math.floor(Math.random() * 3) + 1;
}

function getRandomStake() {
  // Between 0.001 STX (1000 µSTX) and 1 STX (1_000_000 µSTX)
  return Math.floor(Math.random() * 999_001) + 1_000;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// --- TRANSACTION ---

async function sendTransaction(privateKey, index) {
  const card = getRandomCard();
  const stake = getRandomStake();

  try {
    const txOptions = {
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: FUNCTION_NAME,
      functionArgs: [uintCV(card), uintCV(stake)],
      senderKey: privateKey,
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    };

    const tx = await makeContractCall(txOptions);
    const res = await broadcastTransaction({ transaction: tx, network });

    if (res.error) {
      console.error(`TX ${index + 1}/${TOTAL_TX} broadcast error:`, res.error, res.reason);
    } else {
      console.log(
        `TX ${index + 1}/${TOTAL_TX} | card=${card} stake=${stake}µSTX | txid=${res.txid}`
      );
    }
  } catch (err) {
    console.error(`TX ${index + 1}/${TOTAL_TX} failed:`, err.message);
  }
}

// --- RUN ---

async function run() {
  console.log(`Sending ${TOTAL_TX} transactions to ${CONTRACT_ADDRESS}.${CONTRACT_NAME}…\n`);

  for (let i = 0; i < TOTAL_TX; i++) {
    const key = PRIVATE_KEYS[i % PRIVATE_KEYS.length];
    await sendTransaction(key, i);
    if (i < TOTAL_TX - 1) await sleep(DELAY_MS);
  }

  console.log("\n✅ Done: 50 transactions sent.");
}

run();
