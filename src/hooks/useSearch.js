import { useState, useMemo, useCallback } from "react";

export function useSearch(items, fields = []) {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    if (!query.trim()) return items;
    const q = query.toLowerCase();
    return items.filter((item) =>
      fields.some((field) => {
        const v = field.split(".").reduce((o, k) => o?.[k], item);
        return String(v ?? "").toLowerCase().includes(q);
      })
    );
  }, [items, query, fields.join(",")]);

  const clear = useCallback(() => setQuery(""), []);

  return { query, setQuery, results, clear, hasResults: results.length > 0 };
}
