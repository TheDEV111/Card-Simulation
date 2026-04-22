import { useGameStats } from "../../hooks/useGameStats";
import WinRateDonut from "../ui/WinRateDonut";
import PnLDisplay from "../ui/PnLDisplay";

export default function DashboardWinChart() {
  const stats = useGameStats();

  return (
    <div className="panel p-6 space-y-5">
      <p className="label-caps">Win rate</p>
      <div className="flex items-center gap-6">
        <WinRateDonut winRate={stats?.winRate ?? 0} wins={stats?.wins ?? 0} losses={stats?.losses ?? 0} />
        <div className="space-y-3 flex-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Wins</span>
            <span className="text-sm font-semibold text-win">{stats?.wins ?? 0}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Losses</span>
            <span className="text-sm font-semibold text-loss">{stats?.losses ?? 0}</span>
          </div>
          <div className="h-px bg-white/5" />
          <div className="flex justify-between items-center">
            <span className="text-xs text-white/50">Net P&L</span>
            <PnLDisplay value={stats?.pnl ?? 0} size="sm" />
          </div>
        </div>
      </div>
    </div>
  );
}
