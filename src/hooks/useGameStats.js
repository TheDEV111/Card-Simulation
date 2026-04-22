import { useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";
import { calculateWinRate, calculatePnL, calculateStreak, groupByDate } from "../utils/stats";

export function useGameStats(address) {
  return useMemo(() => {
    const games = address ? MOCK_GAMES.filter((g) => g.player === address) : [];
    const wins  = games.filter((g) => g.outcome === "win").length;
    const recent = games.slice(0, 5);
    const byDate = groupByDate(games);

    return {
      total:    games.length,
      wins,
      losses:   games.length - wins,
      winRate:  calculateWinRate(wins, games.length),
      pnl:      calculatePnL(games),
      streak:   calculateStreak(games),
      recent,
      byDate,
      totalStaked:  games.reduce((s, g) => s + g.stake, 0),
      totalPayout:  games.reduce((s, g) => s + g.payout, 0),
    };
  }, [address]);
}
