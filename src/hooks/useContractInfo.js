import { useMemo } from "react";
import { CONTRACT_ADDRESS, CONTRACT_NAME } from "../utils/constants";

export function useContractInfo() {
  return useMemo(() => ({
    address:   CONTRACT_ADDRESS,
    name:      CONTRACT_NAME,
    fullId:    `${CONTRACT_ADDRESS}.${CONTRACT_NAME}`,
    explorerUrl: `https://explorer.stacks.co/txid/${CONTRACT_ADDRESS}`,
    functions: [
      { name: "play-game",   args: ["card (uint)", "stake (uint)"], description: "Submit your card selection and stake" },
      { name: "get-balance", args: [],               description: "Read contract STX balance" },
      { name: "get-stats",   args: ["player (principal)"], description: "Read player statistics" },
    ],
  }), []);
}
