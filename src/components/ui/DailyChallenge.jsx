import ProgressBar from "./ProgressBar";
import { cn } from "../../utils/cn";

export default function DailyChallenge({ progress = 0, target = 5, reward = "50 µSTX bonus" }) {
  const pct     = Math.min(progress / target, 1);
  const done    = pct >= 1;

  return (
    <div className={cn("panel p-5 space-y-4", done && "shadow-gold-glow")}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
            Daily Challenge
          </p>
          <p className="text-xs text-white/40">Play {target} games today</p>
        </div>
        <span className="text-2xl">{done ? "✅" : "🎯"}</span>
      </div>
      <ProgressBar value={progress} max={target} showLabel />
      <p className="text-xs text-gold/70">
        Reward: {reward}
        {done && " — Claimed!"}
      </p>
    </div>
  );
}
