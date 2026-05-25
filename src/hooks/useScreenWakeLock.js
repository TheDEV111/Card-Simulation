import { useState, useRef, useCallback, useEffect } from "react";

export function useScreenWakeLock() {
  const lockRef = useRef(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);
  const supported = typeof navigator !== "undefined" && "wakeLock" in navigator;

  const request = useCallback(async () => {
    if (!supported) return;
    try {
      lockRef.current = await navigator.wakeLock.request("screen");
      lockRef.current.addEventListener("release", () => setActive(false));
      setActive(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [supported]);

  const release = useCallback(async () => {
    await lockRef.current?.release();
    lockRef.current = null;
    setActive(false);
  }, []);

  useEffect(() => {
    const reacquire = () => { if (active) request(); };
    document.addEventListener("visibilitychange", reacquire);
    return () => document.removeEventListener("visibilitychange", reacquire);
  }, [active, request]);

  return { supported, active, error, request, release };
}
