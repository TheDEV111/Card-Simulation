import { useState, useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";
import { calculateWinRate, calculatePnL, calculateStreak } from "../utils/stats";

const PER_PAGE = 20;

export function useGameHistory(address) {
  const [page, setPage]       = useState(1);
  const [filter, setFilter]   = useState("all");
  const [search, setSearch]   = useState("");

  const allGames = useMemo(() => {
    if (!address) return [];
    return MOCK_GAMES.filter((g) => g.player === address);
  }, [address]);

  const filtered = useMemo(() => {
    let list = allGames;
    if (filter !== "all") list = list.filter((g) => g.outcome === filter);
    if (search) list = list.filter((g) => g.txId.includes(search));
    return list;
  }, [allGames, filter, search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  const stats = useMemo(() => {
    const wins = allGames.filter((g) => g.outcome === "win").length;
    return {
      total:   allGames.length,
      wins,
      losses:  allGames.length - wins,
      winRate: calculateWinRate(wins, allGames.length),
      pnl:     calculatePnL(allGames),
      streak:  calculateStreak(allGames),
    };
  }, [allGames]);

  return {
    games:     paginated,
    total:     filtered.length,
    page,
    setPage,
    filter,
    setFilter,
    search,
    setSearch,
    stats,
    perPage:   PER_PAGE,
  };
}
