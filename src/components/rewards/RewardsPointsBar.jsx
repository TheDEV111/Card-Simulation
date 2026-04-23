import { useRewardPoints } from "../../hooks/useRewardPoints";
import AnimatedCounter from "../ui/AnimatedCounter";
import PercentBar from "../ui/PercentBar";

export default function RewardsPointsBar({ className = "" }) {
  const { points, level, nextLevelAt, progress } = useRewardPoints();

  return (
    <div className={`panel p-5 space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Reward Points</h3>
        <span className="text-xs text-white/30">Level {level}</span>
      </div>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold text-gold tabular-nums" style={{ fontFamily: "Cinzel, serif" }}>
          <AnimatedCounter value={points} />
        </p>
        <span className="text-xs text-white/30 mb-1">pts</span>
      </div>
      <PercentBar value={progress} max={100} color="bg-gold" />
      <p className="text-xs text-white/25">{nextLevelAt - points} pts to level {level + 1}</p>
    </div>
  );
}
