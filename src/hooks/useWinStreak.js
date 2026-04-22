import { useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";

export function useWinStreak() {
  return useMemo(() => {
    const sorted = [...MOCK_GAMES].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    let current = 0;
    let best = 0;
    let streak = 0;

    for (const game of sorted) {
      if (game.outcome === "win") {
        streak++;
        if (streak > best) best = streak;
        if (current === 0) current = streak;
      } else {
        if (current === 0) current = 0;
        streak = 0;
      }
    }

    return { current, best, isOnStreak: current > 0 };
  }, []);
}
