import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import SuitIcon from "../ui/SuitIcon";
import PercentBar from "../ui/PercentBar";

export default function DashboardCardDistribution() {
  const stats = useMemo(() => {
    const total = MOCK_GAMES.length;
    return [1, 2, 3].map((suit) => {
      const games = MOCK_GAMES.filter((g) => g.card === suit);
      const wins  = games.filter((g) => g.outcome === "win").length;
      return {
        suit,
        count: games.length,
        pct: Math.round((games.length / total) * 100),
        winRate: Math.round((wins / Math.max(games.length, 1)) * 100),
      };
    });
  }, []);

  return (
    <div className="panel p-5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Card Distribution</h3>
      <div className="space-y-3">
        {stats.map((s) => (
          <div key={s.suit} className="space-y-1">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SuitIcon suit={s.suit} size="sm" />
                <span className="text-xs text-white/60">{s.count} plays</span>
              </div>
              <span className="text-xs text-white/40">{s.winRate}% win rate</span>
            </div>
            <PercentBar value={s.count} max={MOCK_GAMES.length} />
          </div>
        ))}
      </div>
    </div>
  );
}
