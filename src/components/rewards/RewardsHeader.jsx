import { useProfile } from "../../hooks/useProfile";
import { usePlayerRank } from "../../hooks/usePlayerRank";
import AnimatedCounter from "../ui/AnimatedCounter";
import ProgressRing from "../ui/ProgressRing";

const LEVEL_THRESHOLDS = [0, 10, 25, 50, 100, 200, 500];

function getLevel(games) {
  let lvl = 0;
  for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
    if (games >= LEVEL_THRESHOLDS[i]) lvl = i + 1;
  }
  return Math.min(lvl, LEVEL_THRESHOLDS.length);
}

function getLevelProgress(games) {
  const lvl = getLevel(games);
  const current = LEVEL_THRESHOLDS[lvl - 1] ?? 0;
  const next    = LEVEL_THRESHOLDS[lvl] ?? LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return Math.round(((games - current) / (next - current)) * 100);
}

export default function RewardsHeader({ className = "" }) {
  const { stats } = useProfile();
  const { rank } = usePlayerRank();

  const games = stats?.totalGames ?? 0;
  const level = getLevel(games);
  const progress = getLevelProgress(games);
  const nextThreshold = LEVEL_THRESHOLDS[level] ?? games;

  return (
    <div className={`panel p-6 flex items-center gap-6 ${className}`}>
      <ProgressRing size={72} stroke={5} value={progress} max={100} color="stroke-gold">
        <span className="text-lg font-bold text-gold" style={{ fontFamily: "Cinzel, serif" }}>{level}</span>
      </ProgressRing>
      <div className="flex-1 space-y-1">
        <p className="text-xs text-white/40 uppercase tracking-wider">Level {level}</p>
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          <AnimatedCounter value={games} /> games played
        </h2>
        <p className="text-xs text-white/30">
          {nextThreshold - games} more games to level {level + 1}
          {rank && <span className="ml-3">· Rank #{rank}</span>}
        </p>
      </div>
    </div>
  );
}
