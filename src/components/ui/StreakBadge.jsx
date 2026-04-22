import { cn } from "../../utils/cn";

export default function StreakBadge({ streak }) {
  if (!streak) return null;
  const hot = streak >= 3;
  return (
    <div className={cn(
      "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold",
      hot ? "bg-loss/15 text-loss border border-loss/30" : "bg-surface-overlay text-white/50 border border-white/10"
    )}>
      <span>{hot ? "🔥" : "⚡"}</span>
      {streak} in a row
    </div>
  );
}
