import { useEffect, useRef } from "react";
import { useAppFocus } from "./useAppFocus.js";

export function useRefetchOnFocus(refetch, { staleTime = 60_000 } = {}) {
  const lastFetchRef = useRef(0);
  const { focused, focusCount } = useAppFocus();

  useEffect(() => {
    if (!focused) return;
    const now = Date.now();
    if (now - lastFetchRef.current < staleTime) return;
    lastFetchRef.current = now;
    refetch?.();
  }, [focusCount, focused, staleTime, refetch]);
}
