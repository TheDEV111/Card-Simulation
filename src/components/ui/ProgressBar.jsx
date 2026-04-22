import { cn } from "../../utils/cn";

export default function ProgressBar({ value, max = 100, color = "gold", showLabel = false, className }) {
  const pct = Math.min(Math.max((value / max) * 100, 0), 100);
  const colors = {
    gold:  "bg-gold",
    win:   "bg-win",
    loss:  "bg-loss",
    white: "bg-white/40",
  };
  return (
    <div className={cn("space-y-1", className)}>
      {showLabel && (
        <div className="flex justify-between text-2xs text-white/40">
          <span>{Math.round(pct)}%</span>
          <span>{value}/{max}</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-surface-overlay rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700 ease-expo-out", colors[color] || colors.gold)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
