import { useEffect, useRef, useCallback } from "react";

export function useTimeout(callback, delay) {
  const savedCallback = useRef(callback);
  const timeoutRef = useRef(null);

  useEffect(() => { savedCallback.current = callback; }, [callback]);

  const reset = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (delay !== null) {
      timeoutRef.current = setTimeout(() => savedCallback.current(), delay);
    }
  }, [delay]);

  const clear = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  useEffect(() => {
    reset();
    return clear;
  }, [reset, clear]);

  return { reset, clear };
}
