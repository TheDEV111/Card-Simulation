import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");

import {
  makeSTXTokenTransfer,
  broadcastTransaction,
  TransactionVersion,
  getAddressFromPrivateKey,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

const SENDER_KEY   = process.env.SENDER_KEY ?? "";
const RECIPIENT    = "SP24BDDZQHPNM6CMH2NVXSGZHD1M0S3ZE1NSQ68EX";
const AMOUNT_USTX  = 1_000_000n; // 1 STX
const NONCE        = 112;
const FEE          = 10_000;    // 0.01 STX — high enough to replace the stuck 300 µSTX TX

if (!SENDER_KEY) {
  console.error("Set SENDER_KEY env var.");
  process.exit(1);
}

const network = new StacksMainnet();

async function run() {
  const sender = getAddressFromPrivateKey(SENDER_KEY, TransactionVersion.Mainnet);
  console.log(`\nReplacing stuck TX at nonce ${NONCE}`);
  console.log(`From: ${sender}`);
  console.log(`To:   ${RECIPIENT}`);
  console.log(`Amount: 1 STX | Fee: ${FEE} µSTX\n`);

  const tx = await makeSTXTokenTransfer({
    recipient: RECIPIENT,
    amount: AMOUNT_USTX,
    senderKey: SENDER_KEY,
    network,
    nonce: NONCE,
    fee: FEE,
  });

  const res = await broadcastTransaction(tx, network);

  if (res.error) {
    console.error("Failed:", res.reason ?? res.error);
  } else {
    console.log("✅ Replacement TX broadcast:", res.txid);
    console.log(`Track: https://explorer.hiro.so/txid/${res.txid}?chain=mainnet`);
  }
}

run();
