import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import SuitIcon from "../ui/SuitIcon";
import PercentBar from "../ui/PercentBar";

export default function DashboardSuitWinRates() {
  const suits = useMemo(() => {
    return [1, 2, 3].map((s) => {
      const games = MOCK_GAMES.filter((g) => g.card === s);
      const wins  = games.filter((g) => g.outcome === "win").length;
      const rate  = Math.round((wins / Math.max(games.length, 1)) * 100);
      return { suit: s, games: games.length, wins, rate };
    });
  }, []);

  const maxRate = Math.max(...suits.map((s) => s.rate));

  return (
    <div className="panel p-5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Win Rates by Suit</h3>
      <div className="space-y-4">
        {suits.map((s) => (
          <div key={s.suit} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SuitIcon suit={s.suit} size="sm" />
                <span className="text-xs text-white/50">{s.games} games</span>
              </div>
              <span className={`text-xs font-semibold ${s.rate === maxRate ? "text-gold" : "text-white/60"}`}>
                {s.rate}%
              </span>
            </div>
            <PercentBar value={s.rate} max={50} color={s.rate === maxRate ? "bg-gold" : "bg-white/20"} />
          </div>
        ))}
      </div>
    </div>
  );
}
