import { useMemo } from "react";
import { useGameStats } from "./useGameStats";
import { useGameHistory } from "./useGameHistory";
import { useWallet } from "../context/WalletContext";

export function useDashboard() {
  const { address } = useWallet();
  const stats = useGameStats();
  const { games } = useGameHistory();

  return useMemo(() => ({
    connected: !!address,
    hasGames:  games.length > 0,
    streak:    stats?.streak ?? 0,
    winRate:   stats?.winRate ?? 0,
    pnl:       stats?.pnl ?? 0,
    recentWin: games.find((g) => g.outcome === "win") ?? null,
  }), [address, stats, games]);
}
