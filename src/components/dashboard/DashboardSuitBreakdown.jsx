import { useMemo } from "react";
import { useGameHistory } from "../../hooks/useGameHistory";
import ProgressBar from "../ui/ProgressBar";

const SUITS = [
  { id: 1, label: "Spades",   symbol: "♠", color: "default" },
  { id: 2, label: "Hearts",   symbol: "♥", color: "loss"    },
  { id: 3, label: "Diamonds", symbol: "♦", color: "gold"    },
];

export default function DashboardSuitBreakdown() {
  const { games } = useGameHistory();

  const breakdown = useMemo(() => {
    const total = games.length || 1;
    return SUITS.map((suit) => {
      const picks = games.filter((g) => g.card === suit.id);
      const wins  = picks.filter((g) => g.outcome === "win").length;
      return {
        ...suit,
        picks: picks.length,
        wins,
        pct: Math.round((picks.length / total) * 100),
        winRate: picks.length > 0 ? Math.round((wins / picks.length) * 100) : 0,
      };
    });
  }, [games]);

  return (
    <div className="panel p-5 space-y-4">
      <p className="label-caps">Suit breakdown</p>
      <div className="space-y-4">
        {breakdown.map((suit) => (
          <div key={suit.id} className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-white/70">{suit.symbol} {suit.label}</span>
              <span className="text-white/40">{suit.picks} picks · {suit.winRate}% win</span>
            </div>
            <ProgressBar value={suit.pct} max={100} color={suit.color} />
          </div>
        ))}
      </div>
    </div>
  );
}
