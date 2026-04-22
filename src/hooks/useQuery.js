import { useState, useEffect, useRef, useCallback } from "react";

export function useQuery(queryFn, deps = [], { enabled = true, refetchInterval } = {}) {
  const [state, setState] = useState({ data: null, error: null, loading: enabled });
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => { mountedRef.current = false; };
  }, []);

  const fetch = useCallback(async () => {
    if (!enabled) return;
    setState((s) => ({ ...s, loading: true }));
    try {
      const data = await queryFn();
      if (mountedRef.current) setState({ data, error: null, loading: false });
    } catch (error) {
      if (mountedRef.current) setState((s) => ({ ...s, error, loading: false }));
    }
  }, [enabled, ...deps]);

  useEffect(() => {
    fetch();
    if (!refetchInterval) return;
    const id = setInterval(fetch, refetchInterval);
    return () => clearInterval(id);
  }, [fetch, refetchInterval]);

  return { ...state, refetch: fetch };
}
