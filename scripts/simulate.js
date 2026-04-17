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
const FUNCTION_NAME = "play";

const PRIVATE_KEYS = (process.env.PRIVATE_KEYS ?? "").split(",").filter(Boolean);

if (PRIVATE_KEYS.length === 0) {
  console.error("Set PRIVATE_KEYS env var: comma-separated mainnet private keys.");
  process.exit(1);
}

// --- SETTINGS ---
const TOTAL_TX = 50;
// Nonces are tracked locally so we don't wait for confirms between sends
const DELAY_MS = 500;

// --- HELPERS ---

function getRandomCard() {
  return Math.floor(Math.random() * 3) + 1;
}

function getRandomStake() {
  return Math.floor(Math.random() * 999_001) + 1_000;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchNonce(address) {
  const res = await fetch(`https://api.hiro.so/v2/accounts/${address}?proof=0`);
  if (!res.ok) throw new Error(`Failed to fetch nonce for ${address}: ${res.status}`);
  const data = await res.json();
  return data.nonce;
}

// --- TRANSACTION ---

async function sendTransaction(privateKey, nonce, index) {
  const card = getRandomCard();
  const stake = getRandomStake();

  try {
    const tx = await makeContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: FUNCTION_NAME,
      functionArgs: [uintCV(card), uintCV(stake)],
      senderKey: privateKey,
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      nonce,
      fee: 2000n,
    });

    const res = await broadcastTransaction({ transaction: tx, network });

    if (res.error) {
      console.error(`[${index + 1}/50] ✗ card=${card} stake=${(stake / 1e6).toFixed(4)} STX | ${res.reason ?? res.error}`);
      return "error";
    }

    console.log(`[${index + 1}/50] ✓ card=${card} stake=${(stake / 1e6).toFixed(4)} STX | ${res.txid}`);
    return "sent";
  } catch (err) {
    console.error(`[${index + 1}/50] ✗ ${err.message}`);
    return "error";
  }
}

// --- RUN ---

async function run() {
  console.log(`\nTarget: ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`Keys:   ${PRIVATE_KEYS.length}`);
  console.log(`TXs:    ${TOTAL_TX}\n`);

  // Fetch starting nonce per key so consecutive TXs from the same key don't collide
  const nonces = {};
  for (const key of PRIVATE_KEYS) {
    const address = getAddressFromPrivateKey(key, TransactionVersion.Mainnet);
    nonces[key] = await fetchNonce(address);
    console.log(`  ${address} — nonce: ${nonces[key]}`);
  }
  console.log();

  let sent = 0, errors = 0;

  for (let i = 0; i < TOTAL_TX; i++) {
    const key = PRIVATE_KEYS[i % PRIVATE_KEYS.length];
    const result = await sendTransaction(key, nonces[key]++, i);
    if (result === "sent") sent++; else errors++;
    if (i < TOTAL_TX - 1) await sleep(DELAY_MS);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Sent:   ${sent}`);
  console.log(`✗  Errors: ${errors}`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

run();
