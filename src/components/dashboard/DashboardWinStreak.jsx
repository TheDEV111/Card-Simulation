import { useGameHistory } from "../../hooks/useGameHistory";
import { useMemo } from "react";

export default function DashboardWinStreak() {
  const { games } = useGameHistory();

  const { current, best } = useMemo(() => {
    let current = 0, best = 0, running = 0;
    for (const game of games) {
      if (game.outcome === "win") {
        running++;
        if (running > best) best = running;
      } else {
        running = 0;
      }
    }
    current = running;
    return { current, best };
  }, [games]);

  return (
    <div className="panel p-5 space-y-3">
      <p className="label-caps">Streaks</p>
      <div className="flex gap-4">
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-win" style={{ fontFamily: "Cinzel, serif" }}>
            {current}
          </p>
          <p className="text-xs text-white/40">Current</p>
        </div>
        <div className="w-px bg-white/10" />
        <div className="flex-1 text-center">
          <p className="text-2xl font-bold text-gold" style={{ fontFamily: "Cinzel, serif" }}>
            {best}
          </p>
          <p className="text-xs text-white/40">Best ever</p>
        </div>
      </div>
    </div>
  );
}
