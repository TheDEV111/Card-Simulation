import { useState, useMemo } from "react";
import { searchItems } from "../utils/search";

export function useFuzzySearch(items, keys, { debounce = 200 } = {}) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const timer = { current: null };

  function handleQueryChange(q) {
    setQuery(q);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setDebouncedQuery(q), debounce);
  }

  const results = useMemo(() => {
    if (!debouncedQuery) return items;
    return searchItems(items, debouncedQuery, keys);
  }, [items, debouncedQuery, keys]);

  return { query, setQuery: handleQueryChange, results, hasQuery: Boolean(debouncedQuery) };
}
