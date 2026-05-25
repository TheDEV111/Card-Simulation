import { useState, useEffect, useCallback } from "react";
import { getStorageEstimate, getStorageLevel, isPersistentStorage, requestPersistentStorage } from "../pwa/storage-estimate.js";

export function useStorageQuota() {
  const [estimate, setEstimate] = useState(null);
  const [persistent, setPersistent] = useState(false);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [est, persisted] = await Promise.all([getStorageEstimate(), isPersistentStorage()]);
    setEstimate(est);
    setPersistent(persisted);
    setLoading(false);
  }, []);

  const requestPersist = useCallback(async () => {
    const granted = await requestPersistentStorage();
    setPersistent(granted);
    return granted;
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const level = estimate ? getStorageLevel(estimate.percent) : "ok";

  return {
    estimate,
    persistent,
    loading,
    level,
    isWarning: level === "warning",
    isCritical: level === "critical",
    refresh,
    requestPersist,
  };
}
