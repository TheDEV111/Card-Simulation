import { useMemo } from "react";
import { useGameStats } from "./useGameStats";
import { useRewards } from "./useRewards";
import { useWallet } from "../context/WalletContext";
import { MOCK_LEADERBOARD } from "../utils/mockData";

export function useProfile() {
  const { address } = useWallet();
  const stats       = useGameStats();
  const { achievements } = useRewards();

  const rank = useMemo(() => {
    if (!address) return null;
    const idx = MOCK_LEADERBOARD.findIndex((p) => p.address === address);
    return idx >= 0 ? idx + 1 : null;
  }, [address]);

  return { address, stats, achievements, rank };
}
