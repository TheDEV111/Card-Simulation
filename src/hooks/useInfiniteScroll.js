import { useState, useCallback, useRef } from "react";
import { useIntersectionObserver } from "./useIntersectionObserver";

export function useInfiniteScroll(fetchPage, { pageSize = 20 } = {}) {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);
  const pageRef = useRef(0);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const result = await fetchPage(pageRef.current, pageSize);
      const items = Array.isArray(result) ? result : result.items ?? [];
      setPages((prev) => [...prev, items]);
      pageRef.current += 1;
      if (items.length < pageSize) setHasMore(false);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [fetchPage, hasMore, loading, pageSize]);

  const { ref: sentinelRef } = useIntersectionObserver({ threshold: 0.1 });

  const reset = useCallback(() => {
    setPages([]);
    setHasMore(true);
    setError(null);
    pageRef.current = 0;
  }, []);

  const items = pages.flat();
  return { items, loading, hasMore, error, loadMore, reset, sentinelRef };
}
