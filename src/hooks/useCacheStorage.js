import { useState, useCallback } from "react";
import { getCacheSize, clearCache, clearAllCaches, formatBytes } from "../pwa/sw-utils.js";
import { PWA_CONFIG } from "../pwa/config.js";

export function useCacheStorage() {
  const [sizes, setSizes] = useState({});
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      const results = await Promise.all(
        Object.entries(PWA_CONFIG.CACHE_NAMES).map(async ([key, name]) => {
          const bytes = await getCacheSize(name);
          return [key, { bytes, formatted: formatBytes(bytes), name }];
        })
      );
      setSizes(Object.fromEntries(results));
    } finally {
      setLoading(false);
    }
  }, []);

  const clear = useCallback(async (cacheKey) => {
    const name = PWA_CONFIG.CACHE_NAMES[cacheKey];
    if (name) await clearCache(name);
    await refresh();
  }, [refresh]);

  const clearAll = useCallback(async () => {
    await clearAllCaches();
    await refresh();
  }, [refresh]);

  const totalBytes = Object.values(sizes).reduce((a, { bytes = 0 }) => a + bytes, 0);

  return { sizes, totalBytes, totalFormatted: formatBytes(totalBytes), loading, refresh, clear, clearAll };
}
