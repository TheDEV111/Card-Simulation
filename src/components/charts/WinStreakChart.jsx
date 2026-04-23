import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import ChartContainer from "./ChartContainer";

export default function WinStreakChart({ className = "" }) {
  const streaks = useMemo(() => {
    const sorted = [...MOCK_GAMES].sort((a, b) => a.timestamp - b.timestamp);
    const result = [];
    let cur = 0;
    sorted.forEach((g) => {
      if (g.outcome === "win") {
        cur++;
        result.push(cur);
      } else {
        cur = 0;
        result.push(0);
      }
    });
    return result.slice(-30);
  }, []);

  const maxStreak = Math.max(...streaks, 1);

  return (
    <ChartContainer title="Win Streak — last 30 games" className={className}>
      <div className="flex items-end gap-0.5 h-14">
        {streaks.map((s, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${s > 0 ? "bg-win/50" : "bg-loss/20"}`}
            style={{ height: s > 0 ? `${Math.max(8, Math.round((s / maxStreak) * 56))}px` : "4px" }}
            title={s > 0 ? `${s} win streak` : "Loss"}
          />
        ))}
      </div>
    </ChartContainer>
  );
}
