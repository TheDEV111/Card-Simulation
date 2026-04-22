import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import SuitIcon from "../ui/SuitIcon";
import PercentBar from "../ui/PercentBar";
import StatRow from "../ui/StatRow";

export default function ProfileSuitBreakdown({ className = "" }) {
  const suits = useMemo(() => {
    return [1, 2, 3].map((id) => {
      const picked = MOCK_GAMES.filter((g) => g.card === id);
      const wins   = picked.filter((g) => g.outcome === "win").length;
      const stake  = picked.reduce((s, g) => s + g.stake, 0);
      const payout = picked.filter((g) => g.outcome === "win").reduce((s, g) => s + g.payout, 0);
      return { id, games: picked.length, wins, winRate: Math.round((wins / Math.max(picked.length, 1)) * 100), pnl: payout - stake };
    });
  }, []);

  const max = Math.max(...suits.map((s) => s.winRate));

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">By Suit</h3>
      <div className="space-y-4">
        {suits.map((s) => (
          <div key={s.id} className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SuitIcon suit={s.id} size="sm" />
                <span className="text-xs text-white/50">{s.games} games</span>
              </div>
              <span className={`text-xs font-semibold ${s.winRate === max ? "text-gold" : "text-white/50"}`}>
                {s.winRate}% win rate
              </span>
            </div>
            <PercentBar value={s.winRate} max={60} color={s.winRate === max ? "bg-gold" : "bg-white/15"} />
          </div>
        ))}
      </div>
    </div>
  );
}
