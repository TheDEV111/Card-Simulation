import { useState, useMemo, useCallback } from "react";
import { sortBy } from "../utils/sort";

export function useSortedList(items, { defaultKey, defaultDirection = "asc" } = {}) {
  const [sortKey, setSortKey] = useState(defaultKey ?? null);
  const [direction, setDirection] = useState(defaultDirection);

  const sorted = useMemo(() => {
    if (!sortKey) return items;
    return sortBy(items, sortKey, direction);
  }, [items, sortKey, direction]);

  const handleSort = useCallback((key) => {
    if (key === sortKey) setDirection((d) => (d === "asc" ? "desc" : "asc"));
    else { setSortKey(key); setDirection("asc"); }
  }, [sortKey]);

  const isSorted = useCallback((key) => sortKey === key, [sortKey]);
  const getSortDir = useCallback((key) => (sortKey === key ? direction : null), [sortKey, direction]);

  return { sorted, sortKey, direction, handleSort, isSorted, getSortDir };
}
