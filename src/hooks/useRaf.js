import { useRef, useEffect, useCallback } from "react";

export function useRaf(callback, active = true) {
  const rafRef  = useRef(null);
  const cbRef   = useRef(callback);
  cbRef.current = callback;

  const tick = useCallback((ts) => {
    cbRef.current(ts);
    if (active) rafRef.current = requestAnimationFrame(tick);
  }, [active]);

  useEffect(() => {
    if (!active) return;
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [active, tick]);
}
