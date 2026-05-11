import { useState, useEffect, useCallback, useRef } from "react";

const EVENTS = ["mousedown", "mousemove", "keydown", "touchstart", "scroll", "click"];

export function useIdleTimer({ timeout = 60000, onIdle, onActive } = {}) {
  const [isIdle, setIsIdle] = useState(false);
  const timerRef = useRef(null);
  const onIdleRef = useRef(onIdle);
  const onActiveRef = useRef(onActive);
  onIdleRef.current = onIdle;
  onActiveRef.current = onActive;

  const reset = useCallback(() => {
    if (isIdle) {
      setIsIdle(false);
      onActiveRef.current?.();
    }
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setIsIdle(true);
      onIdleRef.current?.();
    }, timeout);
  }, [isIdle, timeout]);

  useEffect(() => {
    EVENTS.forEach((e) => window.addEventListener(e, reset, { passive: true }));
    reset();
    return () => {
      EVENTS.forEach((e) => window.removeEventListener(e, reset));
      clearTimeout(timerRef.current);
    };
  }, [reset]);

  return { isIdle, reset };
}
