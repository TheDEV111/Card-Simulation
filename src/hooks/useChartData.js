import { useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";

export function useChartData(days = 14) {
  return useMemo(() => {
    const now = Date.now();
    return Array.from({ length: days }, (_, i) => {
      const date = new Date(now - (days - 1 - i) * 86_400_000);
      const label = date.toLocaleDateString("en", { month: "short", day: "numeric" });
      const dayStr = date.toISOString().split("T")[0];
      const dayGames = MOCK_GAMES.filter((g) => g.timestamp.startsWith(dayStr));
      const wins  = dayGames.filter((g) => g.outcome === "win").length;
      const losses = dayGames.length - wins;
      const volume = dayGames.reduce((s, g) => s + g.stake, 0);
      const pnl    = dayGames.reduce((s, g) => s + g.payout - g.stake, 0);
      return { label, date: dayStr, games: dayGames.length, wins, losses, volume, pnl };
    });
  }, [days]);
}
