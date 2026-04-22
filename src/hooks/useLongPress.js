import { useRef, useCallback } from "react";

export function useLongPress(callback, delay = 500) {
  const timer = useRef(null);

  const start = useCallback((e) => {
    timer.current = setTimeout(() => callback(e), delay);
  }, [callback, delay]);

  const stop = useCallback(() => {
    if (timer.current) { clearTimeout(timer.current); timer.current = null; }
  }, []);

  return { onMouseDown: start, onMouseUp: stop, onMouseLeave: stop, onTouchStart: start, onTouchEnd: stop };
}
