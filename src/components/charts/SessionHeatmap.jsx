import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";

const HOURS  = Array.from({ length: 24 }, (_, i) => i);
const DAYS   = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function SessionHeatmap({ className = "" }) {
  const grid = useMemo(() => {
    const counts = {};
    MOCK_GAMES.forEach((g) => {
      const d = new Date(g.timestamp);
      const key = `${d.getDay()}-${d.getHours()}`;
      counts[key] = (counts[key] ?? 0) + 1;
    });
    const max = Math.max(...Object.values(counts), 1);
    return { counts, max };
  }, []);

  return (
    <div className={`panel p-5 space-y-3 overflow-x-auto ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Activity Heatmap</h3>
      <div className="space-y-1 min-w-max">
        {DAYS.map((day, di) => (
          <div key={day} className="flex items-center gap-1">
            <span className="text-[9px] text-white/25 w-7 flex-shrink-0">{day}</span>
            <div className="flex gap-0.5">
              {HOURS.map((h) => {
                const count = grid.counts[`${di}-${h}`] ?? 0;
                const intensity = Math.round((count / grid.max) * 4);
                const bg = ["bg-white/4", "bg-gold/15", "bg-gold/30", "bg-gold/50", "bg-gold"][intensity];
                return (
                  <div
                    key={h}
                    className={`w-2.5 h-2.5 rounded-sm ${bg}`}
                    title={`${day} ${h}:00 — ${count} games`}
                  />
                );
              })}
            </div>
          </div>
        ))}
        <div className="flex items-center gap-1 mt-2 pl-8">
          {HOURS.filter((_, i) => i % 4 === 0).map((h) => (
            <span key={h} className="text-[8px] text-white/20 w-[46px]">{h}:00</span>
          ))}
        </div>
      </div>
    </div>
  );
}
