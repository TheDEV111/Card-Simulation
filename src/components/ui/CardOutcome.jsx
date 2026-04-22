import SuitIcon from "./SuitIcon";
import WinLossChip from "./WinLossChip";

export default function CardOutcome({ card, contractCard, outcome, className = "" }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-white/40">You</span>
        <SuitIcon suit={card} size="lg" />
      </div>
      <span className="text-white/20 text-sm">vs</span>
      <div className="flex items-center gap-1.5">
        <span className="text-xs text-white/40">Contract</span>
        <SuitIcon suit={contractCard} size="lg" />
      </div>
      <WinLossChip outcome={outcome} />
    </div>
  );
}
