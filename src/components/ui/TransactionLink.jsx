import ExternalLink from "./ExternalLink";

const EXPLORER_BASE = "https://explorer.stacks.co/txid";

export default function TransactionLink({ txId, short = true }) {
  const label = short ? `${txId.slice(0, 10)}…` : txId;
  return (
    <ExternalLink href={`${EXPLORER_BASE}/${txId}?chain=mainnet`}>
      {label}
    </ExternalLink>
  );
}
