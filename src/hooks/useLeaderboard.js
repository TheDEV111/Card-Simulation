import { useState, useMemo } from "react";
import { MOCK_LEADERBOARD } from "../utils/mockData";

const PER_PAGE = 10;

export function useLeaderboard() {
  const [page, setPage]   = useState(1);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    if (!search) return MOCK_LEADERBOARD;
    return MOCK_LEADERBOARD.filter((p) =>
      p.address.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const paginated = useMemo(() => {
    const start = (page - 1) * PER_PAGE;
    return filtered.slice(start, start + PER_PAGE);
  }, [filtered, page]);

  return {
    entries:  paginated,
    total:    filtered.length,
    page,
    setPage,
    search,
    setSearch,
    perPage:  PER_PAGE,
  };
}
