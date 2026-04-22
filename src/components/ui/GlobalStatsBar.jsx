import { MOCK_GAMES, MOCK_LEADERBOARD } from "../../utils/mockData";
import { formatSTX } from "../../utils/format";

const totalGames  = MOCK_GAMES.length;
const totalStaked = MOCK_GAMES.reduce((s, g) => s + g.stake, 0);
const totalWins   = MOCK_GAMES.filter((g) => g.outcome === "win").length;

export default function GlobalStatsBar() {
  return (
    <div className="flex items-center justify-center gap-8 py-3 px-6 border-y border-white/5 text-center">
      {[
        { label: "Total games", value: totalGames.toLocaleString() },
        { label: "Total staked", value: formatSTX(totalStaked) },
        { label: "Players",     value: MOCK_LEADERBOARD.length },
        { label: "Win rate",    value: `${Math.round((totalWins / totalGames) * 100)}%` },
      ].map(({ label, value }) => (
        <div key={label} className="space-y-0.5">
          <p className="text-xs text-white/20 uppercase tracking-widest">{label}</p>
          <p className="text-sm font-semibold text-white/60">{value}</p>
        </div>
      ))}
    </div>
  );
}
