import { useGameStats } from "../../hooks/useGameStats";
import { useGameHistory } from "../../hooks/useGameHistory";
import GameResultCard from "../ui/GameResultCard";
import STXAmount from "../ui/STXAmount";
import PnLDisplay from "../ui/PnLDisplay";

export default function GameSidebar() {
  const stats = useGameStats();
  const { games } = useGameHistory();
  const lastGame = games[0];

  return (
    <div className="space-y-4">
      {/* Session stats */}
      <div className="panel p-4 space-y-3">
        <p className="label-caps">Your session</p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: "Games",   value: stats?.total ?? 0 },
            { label: "Win rate", value: `${Math.round((stats?.winRate ?? 0) * 100)}%` },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <p className="text-lg font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>{value}</p>
              <p className="text-xs text-white/40">{label}</p>
            </div>
          ))}
        </div>
        <div className="h-px bg-white/5" />
        <div className="flex items-center justify-between">
          <span className="text-xs text-white/50">Net P&L</span>
          <PnLDisplay value={stats?.pnl ?? 0} size="sm" />
        </div>
      </div>

      {/* Last game */}
      {lastGame && (
        <div className="space-y-2">
          <p className="label-caps">Last game</p>
          <GameResultCard game={lastGame} compact />
        </div>
      )}
    </div>
  );
}
