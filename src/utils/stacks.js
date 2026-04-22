import { CONTRACT_ADDRESS, CONTRACT_NAME, EXPLORER_BASE } from "./constants";

export function explorerTxUrl(txId) {
  return `${EXPLORER_BASE}/txid/${txId}?chain=mainnet`;
}

export function explorerAddressUrl(address) {
  return `${EXPLORER_BASE}/address/${address}?chain=mainnet`;
}

export function explorerContractUrl() {
  return `${EXPLORER_BASE}/txid/${CONTRACT_ADDRESS}.${CONTRACT_NAME}?chain=mainnet`;
}

export function truncateAddress(address, chars = 6) {
  if (!address) return "";
  return `${address.slice(0, chars)}…${address.slice(-chars)}`;
}

export function isTestnet(address) {
  return typeof address === "string" && address.startsWith("ST");
}

export function isMainnet(address) {
  return typeof address === "string" && address.startsWith("SP");
}

export function ustxToStx(ustx) {
  return ustx / 1_000_000;
}

export function stxToUstx(stx) {
  return Math.round(stx * 1_000_000);
}
