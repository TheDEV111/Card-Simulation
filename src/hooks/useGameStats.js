import { useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";
import { calculateWinRate, calculatePnL, calculateStreak, groupByDate } from "../utils/stats";
import { useWallet } from "../context/WalletContext";

export function useGameStats() {
  const { address } = useWallet();

  return useMemo(() => {
    const games = MOCK_GAMES;
    if (games.length === 0) {
      return {
        total: 0, wins: 0, losses: 0, winRate: 0,
        pnl: 0, streak: 0, recent: [],
        byDate: {}, totalStaked: 0, totalPayout: 0,
      };
    }

    const wins   = games.filter((g) => g.outcome === "win").length;
    const losses = games.length - wins;
    const recent = games.slice(0, 20);
    const byDate = groupByDate(games);
    const totalStaked = games.reduce((s, g) => s + g.stake, 0);
    const totalPayout = games
      .filter((g) => g.outcome === "win")
      .reduce((s, g) => s + g.payout, 0);

    return {
      total: games.length,
      wins,
      losses,
      winRate:  calculateWinRate(wins, games.length),
      pnl:      calculatePnL(games),
      streak:   calculateStreak(games),
      recent,
      byDate,
      totalStaked,
      totalPayout,
    };
  }, [address]);
}
