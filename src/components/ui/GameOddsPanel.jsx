import InfoRow from "./InfoRow";

export default function GameOddsPanel() {
  return (
    <div className="panel px-5 divide-y divide-white/5">
      <InfoRow label="Win odds"       value="1 in 3 (33.3%)" />
      <InfoRow label="Win payout"     value="2× stake" accent />
      <InfoRow label="Min stake"      value="0.001 STX" />
      <InfoRow label="Max stake"      value="1 STX" />
      <InfoRow label="Settlement"     value="On-chain, instant" />
      <InfoRow label="House edge"     value="~33%" />
      <InfoRow label="Contract"       value="Stacks Mainnet" />
    </div>
  );
}
