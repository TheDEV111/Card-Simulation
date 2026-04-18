import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");

import {
  makeContractCall,
  broadcastTransaction,
  sponsorTransaction,
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

// Player wallets — need zero STX (fees covered by sponsor)
const PRIVATE_KEYS = (process.env.PRIVATE_KEYS ?? "").split(",").filter(Boolean);

// Sponsor wallet — pays all TX fees (the deployer wallet)
const SPONSOR_KEY = process.env.SPONSOR_KEY ?? "";

if (PRIVATE_KEYS.length === 0) {
  console.error("Set PRIVATE_KEYS env var: comma-separated player private keys.");
  process.exit(1);
}
if (!SPONSOR_KEY) {
  console.error("Set SPONSOR_KEY env var: private key of the fee-paying sponsor wallet.");
  process.exit(1);
}

// --- SETTINGS ---
const TOTAL_TX = 25;
const DELAY_MS = 800;
const BATCH_SIZE = 24;          // Stacks mempool limit per address is 25 unconfirmed
const BATCH_WAIT_MS = 660000;   // 11 min between batches — waits for a full Stacks block to confirm
// Fixed small stake — contract still requires MIN_STAKE of 1000 µSTX
// but sponsor covers fees; player wallets need 0 STX
const FIXED_STAKE = 1000; // 0.001 STX

// --- HELPERS ---

function getRandomCard() {
  return Math.floor(Math.random() * 3) + 1;
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchNonce(address, attempt = 0) {
  const res = await fetch(`https://api.hiro.so/extended/v1/address/${address}/nonces`);
  if (res.status === 429) {
    const wait = 10000 * (attempt + 1);
    console.log(`  Rate limited — waiting ${wait / 1000}s...`);
    await sleep(wait);
    return fetchNonce(address, attempt + 1);
  }
  if (!res.ok) throw new Error(`Failed to fetch nonce for ${address}: ${res.status}`);
  const data = await res.json();
  return data.possible_next_nonce;
}

async function retry(fn, retries = 3, delayMs = 5000) {
  for (let i = 0; i < retries; i++) {
    try { return await fn(); }
    catch (err) {
      if (i < retries - 1) await sleep(delayMs);
      else throw err;
    }
  }
}

// --- TRANSACTION ---

async function sendTransaction(playerKey, playerNonce, sponsorNonce, index) {
  const card = getRandomCard();

  try {
    // Player signs with sponsored:true — no fee required from player
    const tx = await makeContractCall({
      contractAddress: CONTRACT_ADDRESS,
      contractName: CONTRACT_NAME,
      functionName: FUNCTION_NAME,
      functionArgs: [uintCV(card), uintCV(FIXED_STAKE)],
      senderKey: playerKey,
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      nonce: playerNonce,
      fee: 0,
      sponsored: true,
    });

    // Sponsor signs and sets the actual fee
    const sponsored = await sponsorTransaction({
      transaction: tx,
      sponsorPrivateKey: SPONSOR_KEY,
      fee: 2000,
      sponsorNonce,
    });

    const res = await retry(() => broadcastTransaction(sponsored, network));

    if (res.error) {
      const reason = res.reason ?? res.error;
      const nonceError =
        reason === "ConflictingNonceInMempool" ? "conflict" :
        reason === "BadNonce" ? "bad" : false;
      console.error(`[${index + 1}/50] ✗ card=${card} | ${reason}`);
      return { status: "error", nonceError };
    }

    console.log(`[${index + 1}/50] ✓ card=${card} stake=0.001 STX | ${res.txid}`);
    return { status: "sent", nonceError: false };
  } catch (err) {
    console.error(`[${index + 1}/50] ✗ ${err.message}`);
    return { status: "error", nonceError: false };
  }
}

// --- RUN ---

async function run() {
  const sponsorAddress = getAddressFromPrivateKey(SPONSOR_KEY, TransactionVersion.Mainnet);

  console.log(`\nTarget:  ${CONTRACT_ADDRESS}.${CONTRACT_NAME}`);
  console.log(`Players: ${PRIVATE_KEYS.length} wallets (zero STX needed)`);
  console.log(`Sponsor: ${sponsorAddress} (pays all fees)`);
  console.log(`TXs:     ${TOTAL_TX}\n`);

  // Fetch nonces for all players and sponsor
  const playerNonces = {};
  for (const key of PRIVATE_KEYS) {
    const address = getAddressFromPrivateKey(key, TransactionVersion.Mainnet);
    playerNonces[key] = await fetchNonce(address);
    console.log(`  Player ${address} — nonce: ${playerNonces[key]}`);
  }

  let sponsorNonce = await fetchNonce(sponsorAddress);
  console.log(`  Sponsor ${sponsorAddress} — nonce: ${sponsorNonce}\n`);

  let sent = 0, errors = 0;

  for (let i = 0; i < TOTAL_TX; i++) {
    // Pause between batches to let mempool drain (avoids TooMuchChaining)
    if (i > 0 && i % BATCH_SIZE === 0) {
      console.log(`\n⏳ Batch complete — waiting ${BATCH_WAIT_MS / 1000}s for mempool to clear...\n`);
      await sleep(BATCH_WAIT_MS);
      // Refresh sponsor nonce after wait — confirmed TXs free up slots
      sponsorNonce = await fetchNonce(sponsorAddress);
    }

    const playerKey = PRIVATE_KEYS[i % PRIVATE_KEYS.length];
    const playerAddress = getAddressFromPrivateKey(playerKey, TransactionVersion.Mainnet);

    const { status, nonceError } = await sendTransaction(
      playerKey, playerNonces[playerKey], sponsorNonce, i
    );

    if (status === "sent") {
      sent++;
      playerNonces[playerKey]++;
      sponsorNonce++;
    } else {
      errors++;
      if (nonceError === "conflict") {
        // Stuck pending TX in mempool — bump past it, don't re-fetch
        playerNonces[playerKey]++;
        sponsorNonce++;
      } else if (nonceError === "bad") {
        // Nonce too low (already confirmed) — re-fetch to get current value
        playerNonces[playerKey] = await fetchNonce(playerAddress);
        sponsorNonce = await fetchNonce(sponsorAddress);
      }
    }

    if (i < TOTAL_TX - 1) await sleep(DELAY_MS);
  }

  console.log(`\n━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
  console.log(`✅ Sent:   ${sent}`);
  console.log(`✗  Errors: ${errors}`);
  console.log(`Total fees: ~${(sent * 0.002).toFixed(3)} STX (paid by sponsor)`);
  console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
}

run();
