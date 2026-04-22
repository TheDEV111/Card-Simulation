import ProgressBar from "./ProgressBar";
import { cn } from "../../utils/cn";

export default function AchievementCard({ achievement }) {
  const { icon, title, desc, unlocked, progress, current, target } = achievement;
  return (
    <div className={cn(
      "panel p-4 space-y-3 transition-all duration-200",
      unlocked ? "shadow-gold-glow" : "opacity-60"
    )}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span className={cn("text-2xl", !unlocked && "grayscale")}>{icon}</span>
          <div>
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>{title}</p>
            <p className="text-xs text-white/40">{desc}</p>
          </div>
        </div>
        {unlocked && <span className="text-gold text-lg">✓</span>}
      </div>
      {!unlocked && (
        <ProgressBar value={current} max={target} showLabel />
      )}
    </div>
  );
}
