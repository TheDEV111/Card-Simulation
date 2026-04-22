import { useState, useMemo } from "react";
import { MOCK_LEADERBOARD } from "../utils/mockData";

const PER_PAGE = 10;

export function useLeaderboard() {
  const [page, setPage]     = useState(1);
  const [search, setSearch] = useState("");
  const [loading]           = useState(false);

  const filtered = useMemo(() => {
    if (!search) return MOCK_LEADERBOARD;
    return MOCK_LEADERBOARD.filter((p) =>
      p.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  const players = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  return {
    players, loading,
    total: filtered.length,
    page, setPage, totalPages,
    search, setSearch,
    perPage: PER_PAGE,
  };
}
