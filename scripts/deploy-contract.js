#!/usr/bin/env node
import { readFileSync } from "fs";
import {
  makeContractDeploy,
  broadcastTransaction,
  AnchorMode,
  TransactionVersion,
  PostConditionMode,
} from "@stacks/transactions";
import { StacksMainnet } from "@stacks/network";

const CONTRACT_CODE = readFileSync("./contracts/stx-bouncer.clar", "utf8");
const PRIVATE_KEY = "764384710f1cee746a850510effbb1e007c521c769b7aee9e69667e3ff9ed57c01";
const WALLET_ADDRESS = "SP19AHC15QDZJPDHTF5WQWKKZC6RE38W9D6VC56EH";
const network = new StacksMainnet();

async function deploy() {
  try {
    console.log(`Deploying stx-bouncer to ${WALLET_ADDRESS}...`);

    const tx = await makeContractDeploy({
      contractName: "stx-bouncer",
      codeBody: CONTRACT_CODE,
      senderKey: PRIVATE_KEY,
      network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
      fee: 15000n,
    });

    const res = await broadcastTransaction(tx, network);

    if (res.error) {
      console.error("Deployment failed:", res.reason ?? res.error);
      process.exit(1);
    }

    console.log("✓ Contract deployed!");
    console.log(`Tx ID: ${res.txid}`);
    console.log(`Contract Address: ${WALLET_ADDRESS}.stx-bouncer`);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

deploy();
