import { useMemo } from "react";
import { MOCK_LEADERBOARD } from "../utils/mockData";
import { useWallet } from "../context/WalletContext";

export function usePlayerRank() {
  const { address } = useWallet();

  return useMemo(() => {
    if (!address) return { rank: null, total: MOCK_LEADERBOARD.length, percentile: null };
    const entry = MOCK_LEADERBOARD.find((p) => p.address === address);
    if (!entry) return { rank: null, total: MOCK_LEADERBOARD.length, percentile: null };
    const percentile = Math.round(((MOCK_LEADERBOARD.length - entry.rank + 1) / MOCK_LEADERBOARD.length) * 100);
    return { rank: entry.rank, total: MOCK_LEADERBOARD.length, percentile, entry };
  }, [address]);
}
