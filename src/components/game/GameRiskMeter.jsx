import { useWalletBalance } from "../../hooks/useWalletBalance";
import PercentBar from "../ui/PercentBar";

export default function GameRiskMeter({ stake, className = "" }) {
  const { balance } = useWalletBalance();
  if (!balance || !stake) return null;

  const pct = Math.round((stake / balance) * 100);
  const risk = pct < 10 ? "low" : pct < 30 ? "medium" : "high";
  const colors = { low: "bg-win", medium: "bg-gold", high: "bg-loss" };
  const labels = { low: "Conservative", medium: "Moderate", high: "Aggressive" };

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-white/30">Risk level</span>
        <span className={`text-xs font-semibold ${
          risk === "low" ? "text-win" : risk === "medium" ? "text-gold" : "text-loss"
        }`}>
          {labels[risk]} · {pct}%
        </span>
      </div>
      <PercentBar value={pct} max={50} color={colors[risk]} />
    </div>
  );
}
