import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";

export default function DashboardHeatmap() {
  const weeks = useMemo(() => {
    const now = Date.now();
    const days = Array.from({ length: 84 }, (_, i) => {
      const date = new Date(now - (83 - i) * 86_400_000);
      const dateStr = date.toISOString().split("T")[0];
      const dayGames = MOCK_GAMES.filter((g) => g.timestamp.startsWith(dateStr));
      return { date: dateStr, count: dayGames.length, wins: dayGames.filter((g) => g.outcome === "win").length };
    });
    const rows = [];
    for (let i = 0; i < days.length; i += 7) rows.push(days.slice(i, i + 7));
    return rows;
  }, []);

  const intensity = (count) => {
    if (count === 0) return "bg-white/5";
    if (count < 2)  return "bg-gold/20";
    if (count < 4)  return "bg-gold/40";
    return "bg-gold/70";
  };

  return (
    <div className="panel p-5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-4">Activity</h3>
      <div className="flex gap-1 overflow-x-auto pb-1">
        {weeks.map((week, wi) => (
          <div key={wi} className="flex flex-col gap-1">
            {week.map((day) => (
              <div
                key={day.date}
                title={`${day.date}: ${day.count} games`}
                className={`w-2.5 h-2.5 rounded-sm ${intensity(day.count)} transition-colors`}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2 mt-3">
        <span className="text-[10px] text-white/25">Less</span>
        {["bg-white/5", "bg-gold/20", "bg-gold/40", "bg-gold/70"].map((c) => (
          <div key={c} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
        ))}
        <span className="text-[10px] text-white/25">More</span>
      </div>
    </div>
  );
}
