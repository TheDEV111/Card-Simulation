import { usePlayerRank } from "../../hooks/usePlayerRank";
import StatRow from "../ui/StatRow";

const RANK_BONUSES = [
  { maxRank: 1,  label: "1st Place",  bonus: "50 STX / week",  color: "text-gold" },
  { maxRank: 3,  label: "Top 3",      bonus: "20 STX / week",  color: "text-white/70" },
  { maxRank: 10, label: "Top 10",     bonus: "10 STX / week",  color: "text-white/50" },
  { maxRank: 25, label: "Top 25",     bonus: "5 STX / week",   color: "text-white/40" },
];

export default function RewardsLeaderboardBonus({ className = "" }) {
  const { rank } = usePlayerRank();

  const active = rank ? RANK_BONUSES.find((b) => rank <= b.maxRank) : null;

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Leaderboard Bonus</h3>
      <div className="divide-y divide-white/5">
        {RANK_BONUSES.map((b) => (
          <StatRow
            key={b.maxRank}
            label={<span className={b.color}>{b.label}</span>}
            value={b.bonus}
            accent={active?.maxRank === b.maxRank}
          />
        ))}
      </div>
      {active ? (
        <p className="text-xs text-win">
          You are currently ranked #{rank} — earning <strong>{active.bonus}</strong>
        </p>
      ) : (
        <p className="text-xs text-white/30">Reach top 25 on the leaderboard to earn weekly STX rewards.</p>
      )}
    </div>
  );
}
