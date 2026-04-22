import { useState, useMemo, useCallback } from "react";

export function useSort(items, defaultField, defaultDir = "desc") {
  const [sort, setSort] = useState({ field: defaultField, dir: defaultDir });

  const sorted = useMemo(() => {
    return [...items].sort((a, b) => {
      const av = a[sort.field] ?? 0;
      const bv = b[sort.field] ?? 0;
      const cmp = typeof av === "string" ? av.localeCompare(bv) : av - bv;
      return sort.dir === "asc" ? cmp : -cmp;
    });
  }, [items, sort.field, sort.dir]);

  const toggle = useCallback((field) => {
    setSort((s) => s.field === field
      ? { field, dir: s.dir === "asc" ? "desc" : "asc" }
      : { field, dir: "desc" }
    );
  }, []);

  return { sort, sorted, toggle };
}
