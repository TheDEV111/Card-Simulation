import { useState, useEffect, useCallback, useRef } from "react";

export function usePolling(fn, { interval = 5000, enabled = true, immediate = true } = {}) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const fnRef = useRef(fn);
  fnRef.current = fn;

  const poll = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fnRef.current();
      setData(result);
      setError(null);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!enabled) return;
    if (immediate) poll();
    const id = setInterval(poll, interval);
    return () => clearInterval(id);
  }, [enabled, immediate, interval, poll]);

  return { data, error, loading, refetch: poll };
}
