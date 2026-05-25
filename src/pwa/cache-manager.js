import { PWA_CONFIG } from "./config.js";
import { getCacheSize, formatBytes } from "./sw-utils.js";

export async function getCacheSummary() {
  const entries = await Promise.all(
    Object.entries(PWA_CONFIG.CACHE_NAMES).map(async ([key, name]) => {
      try {
        const cache = await caches.open(name);
        const keys = await cache.keys();
        const bytes = await getCacheSize(name);
        return [key, { name, count: keys.length, bytes, formatted: formatBytes(bytes) }];
      } catch {
        return [key, { name, count: 0, bytes: 0, formatted: "0 B" }];
      }
    })
  );
  return Object.fromEntries(entries);
}

export async function pruneCache(cacheName, maxEntries = 50) {
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    if (keys.length <= maxEntries) return 0;
    const toDelete = keys.slice(0, keys.length - maxEntries);
    await Promise.all(toDelete.map((k) => cache.delete(k)));
    return toDelete.length;
  } catch {
    return 0;
  }
}

export async function pruneAllCaches() {
  const results = await Promise.all([
    pruneCache(PWA_CONFIG.CACHE_NAMES.DYNAMIC, 60),
    pruneCache(PWA_CONFIG.CACHE_NAMES.API, 30),
    pruneCache(PWA_CONFIG.CACHE_NAMES.IMAGES, 100),
  ]);
  return results.reduce((a, b) => a + b, 0);
}

export async function warmCache(urls) {
  const cache = await caches.open(PWA_CONFIG.CACHE_NAMES.STATIC);
  await Promise.allSettled(
    urls.map(async (url) => {
      if (await cache.match(url)) return;
      const res = await fetch(url);
      if (res.ok) cache.put(url, res);
    })
  );
}
