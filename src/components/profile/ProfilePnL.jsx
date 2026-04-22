import { useProfile } from "../../hooks/useProfile";
import { useChartData } from "../../hooks/useChartData";
import STXAmount from "../ui/STXAmount";
import TrendArrow from "../ui/TrendArrow";

export default function ProfilePnL({ className = "" }) {
  const { stats } = useProfile();
  const chartData = useChartData(7);

  if (!stats) return null;

  const pnl     = (stats.totalPayout ?? 0) - (stats.totalStaked ?? 0);
  const lastWeek = chartData.reduce((s, d) => s + d.pnl, 0);
  const isUp     = pnl >= 0;

  return (
    <div className={`panel p-5 space-y-3 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Profit / Loss</h3>
      <div className="flex items-end gap-3">
        <p
          className={`text-2xl font-bold tabular-nums ${isUp ? "text-win" : "text-loss"}`}
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {isUp ? "+" : "−"}<STXAmount ustx={Math.abs(pnl)} />
        </p>
        <TrendArrow value={lastWeek > 0 ? 8.2 : -4.1} className="mb-1" />
      </div>
      <div className="flex gap-4">
        <div>
          <p className="text-xs text-white/30">Total wagered</p>
          <p className="text-sm text-white/60"><STXAmount ustx={stats.totalStaked ?? 0} /></p>
        </div>
        <div>
          <p className="text-xs text-white/30">Total won</p>
          <p className="text-sm text-win"><STXAmount ustx={stats.totalPayout ?? 0} /></p>
        </div>
      </div>
      <div className="flex gap-1 items-end h-8">
        {chartData.map((d, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${d.pnl >= 0 ? "bg-win/30" : "bg-loss/30"}`}
            style={{ height: `${Math.max(4, Math.abs(d.pnl) / 5_000)}px` }}
            title={`${d.label}: ${d.pnl >= 0 ? "+" : ""}${(d.pnl / 1_000_000).toFixed(2)} STX`}
          />
        ))}
      </div>
    </div>
  );
}
