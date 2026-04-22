import { useGameStats } from "../../hooks/useGameStats";
import PnLDisplay from "../ui/PnLDisplay";
import STXAmount from "../ui/STXAmount";

export default function DashboardPnLCard() {
  const stats = useGameStats();
  const pnl = stats?.pnl ?? 0;
  const totalStaked = stats?.totalStaked ?? 0;
  const roi = totalStaked > 0 ? ((pnl / totalStaked) * 100).toFixed(1) : "0.0";

  return (
    <div className="panel p-5 space-y-3">
      <p className="label-caps">Profit & Loss</p>
      <div className="flex items-end justify-between">
        <PnLDisplay value={pnl} size="lg" />
        <div className="text-right">
          <p className="text-xs text-white/30">ROI</p>
          <p className={`text-sm font-semibold ${pnl >= 0 ? "text-win" : "text-loss"}`}>
            {pnl >= 0 ? "+" : ""}{roi}%
          </p>
        </div>
      </div>
      <div className="h-px bg-white/5" />
      <div className="flex justify-between text-xs text-white/40">
        <span>Total staked</span>
        <span className="text-white/60"><STXAmount ustx={totalStaked} /></span>
      </div>
    </div>
  );
}
