import { useGameStats } from "../../hooks/useGameStats";
import StatCard from "../ui/StatCard";
import { formatSTX } from "../../utils/format";
import { SkeletonRect } from "../ui/Skeleton";

export default function DashboardStatsRow() {
  const stats = useGameStats();

  if (!stats) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => <SkeletonRect key={i} className="h-24 rounded-2xl" />)}
      </div>
    );
  }

  const items = [
    { label: "Total games", value: stats.total, trend: null },
    { label: "Win rate",     value: `${Math.round(stats.winRate * 100)}%`, trend: stats.winRate > 0.33 ? "up" : "down" },
    { label: "Net P&L",      value: formatSTX(stats.pnl), trend: stats.pnl > 0 ? "up" : stats.pnl < 0 ? "down" : null },
    { label: "Best streak",  value: `${stats.streak}×`, trend: null },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item) => (
        <StatCard key={item.label} label={item.label} value={item.value} trend={item.trend} />
      ))}
    </div>
  );
}
