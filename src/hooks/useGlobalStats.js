import { useMemo } from "react";
import { MOCK_GAMES, MOCK_LEADERBOARD } from "../utils/mockData";

export function useGlobalStats() {
  return useMemo(() => {
    const wins   = MOCK_GAMES.filter((g) => g.outcome === "win").length;
    const total  = MOCK_GAMES.length;
    const volume = MOCK_GAMES.reduce((s, g) => s + g.stake, 0);
    const payout = MOCK_GAMES.reduce((s, g) => s + g.payout, 0);
    const players = new Set(MOCK_GAMES.map((g) => g.player)).size;
    const biggestWin = Math.max(...MOCK_GAMES.filter((g) => g.outcome === "win").map((g) => g.payout));

    return { totalGames: total, wins, losses: total - wins, winRate: Math.round((wins / total) * 100), volume, payout, players, biggestWin };
  }, []);
}
