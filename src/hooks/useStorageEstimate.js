import { useState, useEffect, useCallback } from "react";

export function useStorageEstimate() {
  const [estimate, setEstimate] = useState({ usage: 0, quota: 0, usagePercent: 0 });
  const [loading, setLoading] = useState(true);
  const supported = typeof navigator !== "undefined" && "storage" in navigator && "estimate" in navigator.storage;

  const refresh = useCallback(async () => {
    if (!supported) return;
    setLoading(true);
    try {
      const { usage = 0, quota = 0 } = await navigator.storage.estimate();
      setEstimate({ usage, quota, usagePercent: quota > 0 ? (usage / quota) * 100 : 0 });
    } finally {
      setLoading(false);
    }
  }, [supported]);

  useEffect(() => { refresh(); }, [refresh]);

  const format = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`;
    if (bytes < 1024 ** 3) return `${(bytes / 1024 ** 2).toFixed(1)} MB`;
    return `${(bytes / 1024 ** 3).toFixed(2)} GB`;
  };

  return {
    ...estimate,
    loading,
    supported,
    refresh,
    usageFormatted: format(estimate.usage),
    quotaFormatted: format(estimate.quota),
  };
}
