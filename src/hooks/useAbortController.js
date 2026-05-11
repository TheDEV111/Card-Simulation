import { useEffect, useRef, useCallback } from "react";

export function useAbortController() {
  const controllerRef = useRef(null);

  const getSignal = useCallback(() => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
    return controllerRef.current.signal;
  }, []);

  const abort = useCallback(() => {
    controllerRef.current?.abort();
  }, []);

  useEffect(() => {
    return () => controllerRef.current?.abort();
  }, []);

  return { getSignal, abort };
}

export function useAbortableFetch() {
  const { getSignal, abort } = useAbortController();

  const fetch_ = useCallback(
    async (url, options = {}) => {
      const signal = getSignal();
      const res = await fetch(url, { ...options, signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    },
    [getSignal]
  );

  return { fetch: fetch_, abort };
}
