import { useState, useEffect, useCallback } from "react";
import { useOnlineStatus } from "./useOnlineStatus.js";

export function useOfflineFallback(fetchFn, fallbackData = null, options = {}) {
  const { isOffline } = useOnlineStatus();
  const [data, setData] = useState(fallbackData);
  const [loading, setLoading] = useState(!isOffline);
  const [error, setError] = useState(null);
  const [isFromCache, setIsFromCache] = useState(false);

  const load = useCallback(async () => {
    if (isOffline) {
      setIsFromCache(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
      setIsFromCache(false);
    } catch (err) {
      setError(err.message);
      if (fallbackData !== null) {
        setData(fallbackData);
        setIsFromCache(true);
      }
    } finally {
      setLoading(false);
    }
  }, [fetchFn, isOffline, fallbackData]);

  useEffect(() => { load(); }, [load]);

  return { data, loading, error, isFromCache, isOffline, refetch: load };
}
