import { PWA_CONFIG } from "./config.js";

const prefetched = new Set();

export async function prefetchUrl(url, cacheName = PWA_CONFIG.CACHE_NAMES.DYNAMIC) {
  if (prefetched.has(url)) return true;
  try {
    const cache = await caches.open(cacheName);
    const existing = await cache.match(url);
    if (existing) { prefetched.add(url); return true; }
    const response = await fetch(url);
    if (response.ok) {
      await cache.put(url, response);
      prefetched.add(url);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

export async function prefetchUrls(urls, cacheName) {
  const results = await Promise.allSettled(urls.map((u) => prefetchUrl(u, cacheName)));
  return results.filter((r) => r.status === "fulfilled" && r.value).length;
}

export async function prefetchRoute(pathname) {
  const base = window.location.origin;
  return prefetchUrl(`${base}${pathname}`);
}

export async function prefetchGameAssets() {
  return prefetchUrls([
    "/",
    "/play",
    "/leaderboard",
  ]);
}

export function isPrefetched(url) {
  return prefetched.has(url);
}
