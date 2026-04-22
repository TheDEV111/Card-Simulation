import { useHotCard } from "../../hooks/useHotCard";
import SuitIcon from "../ui/SuitIcon";
import PulseRing from "../ui/PulseRing";

export default function GameHotSuit({ className = "" }) {
  const { suit, count, winRate, window } = useHotCard(20);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl bg-white/3 border border-white/6 ${className}`}>
      <div className="relative">
        <SuitIcon suit={suit} size="lg" />
        <PulseRing color="gold" size={2} className="absolute -top-0.5 -right-0.5" />
      </div>
      <div className="min-w-0">
        <p className="text-xs font-semibold text-gold">Hot suit</p>
        <p className="text-xs text-white/40">
          {count}/{window} draws · {winRate}% win rate
        </p>
      </div>
    </div>
  );
}
