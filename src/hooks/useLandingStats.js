import { useMemo } from "react";
import { MOCK_GAMES, MOCK_LEADERBOARD } from "../utils/mockData";

export function useLandingStats() {
  return useMemo(() => {
    const totalGames = MOCK_GAMES.length + 4382;
    const totalStaked = MOCK_GAMES.reduce((s, g) => s + g.stake, 0) + 18_450_000_000;
    const totalPlayers = MOCK_LEADERBOARD.length + 847;
    const totalWinners = MOCK_GAMES.filter((g) => g.outcome === "win").length + 1421;

    return { totalGames, totalStaked, totalPlayers, totalWinners };
  }, []);
}
