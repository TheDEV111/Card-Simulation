import { useState, useEffect, useCallback, useRef } from "react";
import { acquireWakeLock, releaseWakeLock, isWakeLockSupported, onWakeLockRelease } from "../pwa/wake-lock.js";

export function useWakeLock() {
  const [active, setActive] = useState(false);
  const [supported] = useState(isWakeLockSupported);
  const [error, setError] = useState(null);
  const sentinelRef = useRef(null);

  const acquire = useCallback(async () => {
    if (!supported) return;
    try {
      setError(null);
      const sentinel = await acquireWakeLock();
      sentinelRef.current = sentinel;
      setActive(true);
      onWakeLockRelease(sentinel, () => {
        sentinelRef.current = null;
        setActive(false);
      });
    } catch (err) {
      if (err.name !== "NotAllowedError") setError(err.message);
    }
  }, [supported]);

  const release = useCallback(async () => {
    await releaseWakeLock(sentinelRef.current);
    sentinelRef.current = null;
    setActive(false);
  }, []);

  useEffect(() => {
    const handleVisibility = () => {
      if (document.visibilityState === "visible" && active && !sentinelRef.current) {
        acquire();
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [active, acquire]);

  useEffect(() => () => { releaseWakeLock(sentinelRef.current); }, []);

  return { active, supported, error, acquire, release };
}
