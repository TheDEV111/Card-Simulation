import { useMemo } from "react";
import { useProfile } from "./useProfile";
import { useWinStreak } from "./useWinStreak";

export function useRewardPoints() {
  const { stats } = useProfile();
  const streak = useWinStreak();

  return useMemo(() => {
    const games = stats?.totalGames ?? 0;
    const wins  = stats?.wins ?? 0;
    const best  = streak?.best ?? 0;
    const points = games * 10 + wins * 25 + best * 50;
    const level  = Math.floor(points / 500) + 1;
    const nextLevelAt = level * 500;
    const progress = Math.round(((points % 500) / 500) * 100);
    return { points, level, nextLevelAt, progress };
  }, [stats, streak]);
}
