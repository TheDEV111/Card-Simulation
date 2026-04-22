import { useState, useMemo, useCallback } from "react";

export function usePagination(items, pageSize = 10) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));

  const paged = useMemo(() => {
    const start = (page - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [items, page, pageSize]);

  const next  = useCallback(() => setPage((p) => Math.min(totalPages, p + 1)), [totalPages]);
  const prev  = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const goTo  = useCallback((p) => setPage(Math.max(1, Math.min(totalPages, p))), [totalPages]);
  const reset = useCallback(() => setPage(1), []);

  return { page, totalPages, paged, next, prev, goTo, reset, hasNext: page < totalPages, hasPrev: page > 1 };
}
