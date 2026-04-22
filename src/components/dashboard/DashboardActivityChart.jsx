import { useMemo } from "react";
import { useGameStats } from "../../hooks/useGameStats";

export default function DashboardActivityChart() {
  const stats = useGameStats();

  const bars = useMemo(() => {
    const byDate = stats?.byDate ?? {};
    const keys = Object.keys(byDate).sort().slice(-14);
    const maxCount = Math.max(1, ...keys.map((k) => byDate[k]?.length ?? 0));
    return keys.map((date) => ({
      date,
      count: byDate[date]?.length ?? 0,
      pct: ((byDate[date]?.length ?? 0) / maxCount) * 100,
      wins: byDate[date]?.filter((g) => g.outcome === "win").length ?? 0,
    }));
  }, [stats]);

  return (
    <div className="panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="label-caps">14-day activity</p>
        <span className="text-xs text-white/30">{bars.reduce((s, b) => s + b.count, 0)} games</span>
      </div>
      <div className="flex items-end gap-1 h-16">
        {bars.length === 0 ? (
          <p className="text-xs text-white/30 w-full text-center py-4">No data yet</p>
        ) : (
          bars.map((bar) => (
            <div
              key={bar.date}
              className="flex-1 flex flex-col justify-end"
              title={`${bar.date}: ${bar.count} game${bar.count !== 1 ? "s" : ""}`}
            >
              <div
                className="rounded-sm bg-gold/60 hover:bg-gold transition-colors duration-150"
                style={{ height: `${Math.max(bar.pct, bar.count > 0 ? 8 : 0)}%` }}
              />
            </div>
          ))
        )}
      </div>
      <div className="flex justify-between text-[10px] text-white/25">
        <span>14 days ago</span>
        <span>Today</span>
      </div>
    </div>
  );
}
