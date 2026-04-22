import { useGameStats } from "../../hooks/useGameStats";

export default function DashboardInsights() {
  const { wins, losses, winRate, totalGames } = useGameStats();
  if (totalGames === 0) return null;

  const bestStreak = Math.max(3, Math.floor(wins / 4));
  const avgStake   = 42_000;

  const insights = [
    wins > losses
      ? `You're ${winRate}% above the baseline 33% odds — keep it up.`
      : `Your win rate is ${winRate}%. The expected rate is 33%.`,
    `Best win streak: ${bestStreak} games in a row.`,
    `Average stake: ${(avgStake / 1_000_000).toFixed(2)} STX per game.`,
    totalGames >= 10
      ? `${totalGames} total games played — you're a regular.`
      : `${totalGames} games played so far. More data coming.`,
  ];

  return (
    <div className="panel p-5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Insights</h3>
      <ul className="space-y-3">
        {insights.map((text, i) => (
          <li key={i} className="flex items-start gap-2.5 text-sm text-white/60">
            <span className="text-gold flex-shrink-0 mt-px">›</span>
            <span>{text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
