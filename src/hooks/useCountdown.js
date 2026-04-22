import { useState, useEffect, useCallback } from "react";

export function useCountdown(initialSeconds) {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running || seconds <= 0) return;
    const id = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(id);
  }, [running, seconds]);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback((s = initialSeconds) => { setSeconds(s); setRunning(false); }, [initialSeconds]);

  return { seconds, running, start, pause, reset, expired: seconds <= 0 };
}
