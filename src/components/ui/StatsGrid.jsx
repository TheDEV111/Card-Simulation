import StatCard from "./StatCard";
import { formatSTX } from "../../utils/format";

export default function StatsGrid({ stats }) {
  if (!stats) return null;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      <StatCard label="Games played" value={stats.total}       />
      <StatCard label="Wins"         value={stats.wins}        accent />
      <StatCard label="Win rate"     value={`${stats.winRate}%`} accent />
      <StatCard label="P&L"          value={formatSTX(stats.pnl)}
        sub={stats.pnl > 0 ? "profit" : stats.pnl < 0 ? "loss" : "break even"}
        trend={stats.pnl}
      />
    </div>
  );
}
