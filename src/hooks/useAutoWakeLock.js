import { useEffect } from "react";
import { useWakeLock } from "./useWakeLock.js";

export function useAutoWakeLock(enabled = true) {
  const { active, supported, acquire, release } = useWakeLock();

  useEffect(() => {
    if (!supported) return;
    if (enabled) {
      acquire();
    } else {
      release();
    }
    return () => { release(); };
  }, [enabled, supported, acquire, release]);

  return { active, supported };
}
