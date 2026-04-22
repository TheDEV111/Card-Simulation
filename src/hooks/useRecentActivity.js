import { useMemo } from "react";
import { MOCK_GAMES } from "../utils/mockData";

export function useRecentActivity(limit = 10) {
  return useMemo(() => {
    const sorted = [...MOCK_GAMES].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    return sorted.slice(0, limit);
  }, [limit]);
}
