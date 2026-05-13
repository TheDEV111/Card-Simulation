import { useState, useCallback } from "react";
import {
  requestPeriodicSync,
  unregisterPeriodicSync,
  isPeriodicSyncSupported,
} from "../pwa/background-sync.js";

export function usePeriodicSync({ minInterval = 24 * 60 * 60 * 1000 } = {}) {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(null);
  const supported = isPeriodicSyncSupported();

  const register = useCallback(async () => {
    setError(null);
    const ok = await requestPeriodicSync(minInterval);
    if (ok) {
      setRegistered(true);
    } else {
      setError("Periodic sync not permitted or not supported");
    }
    return ok;
  }, [minInterval]);

  const unregister = useCallback(async () => {
    await unregisterPeriodicSync();
    setRegistered(false);
  }, []);

  return { supported, registered, error, register, unregister };
}
