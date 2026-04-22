import { useMemo } from "react";
import { useGameStats } from "./useGameStats";
import { useRewards } from "./useRewards";
import { MOCK_LEADERBOARD } from "../utils/mockData";

export function useProfile(address) {
  const stats    = useGameStats(address);
  const rewards  = useRewards(stats);

  const rank = useMemo(() => {
    if (!address) return null;
    const idx = MOCK_LEADERBOARD.findIndex((p) => p.address === address);
    return idx >= 0 ? idx + 1 : null;
  }, [address]);

  return { stats, rewards, rank };
}
