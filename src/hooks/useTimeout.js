import { useEffect, useRef, useCallback } from "react";

export function useTimeout(callback, delay) {
  const saved   = useRef(callback);
  const timerRef = useRef(null);

  useEffect(() => { saved.current = callback; }, [callback]);

  const clear = useCallback(() => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const reset = useCallback(() => {
    clear();
    if (delay !== null) timerRef.current = setTimeout(() => saved.current(), delay);
  }, [delay, clear]);

  useEffect(() => { reset(); return clear; }, [reset, clear]);

  return { clear, reset };
}
