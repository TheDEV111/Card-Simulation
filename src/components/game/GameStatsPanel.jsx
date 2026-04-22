import { useGameStats } from "../../hooks/useGameStats";
import StatRow from "../ui/StatRow";
import STXAmount from "../ui/STXAmount";

export default function GameStatsPanel({ className = "" }) {
  const { wins, losses, winRate, totalStaked, totalPayout, totalGames } = useGameStats();

  return (
    <div className={`panel p-5 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Session Stats</h3>
      <div className="divide-y divide-white/5">
        <StatRow label="Games played" value={totalGames} />
        <StatRow label="Win rate" value={`${winRate}%`} accent={winRate > 33} />
        <StatRow label="Wins / Losses" value={`${wins} / ${losses}`} />
        <StatRow label="Total wagered" value={<STXAmount ustx={totalStaked ?? 0} />} />
        <StatRow label="Total won" value={<STXAmount ustx={totalPayout ?? 0} />} accent />
      </div>
    </div>
  );
}
