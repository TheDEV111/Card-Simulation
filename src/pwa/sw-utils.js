export function isSWSupported() {
  return "serviceWorker" in navigator;
}

export function isStandalone() {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true
  );
}

export function isInstalledPWA() {
  return isStandalone() || document.referrer.includes("android-app://");
}

export async function getCacheSize(cacheName) {
  if (!("caches" in window)) return 0;
  try {
    const cache = await caches.open(cacheName);
    const keys = await cache.keys();
    const sizes = await Promise.all(
      keys.map(async (req) => {
        const res = await cache.match(req);
        const buf = await res?.arrayBuffer();
        return buf?.byteLength ?? 0;
      })
    );
    return sizes.reduce((a, b) => a + b, 0);
  } catch {
    return 0;
  }
}

export async function clearCache(cacheName) {
  if (!("caches" in window)) return false;
  return caches.delete(cacheName);
}

export async function clearAllCaches() {
  if (!("caches" in window)) return;
  const keys = await caches.keys();
  await Promise.all(keys.map((k) => caches.delete(k)));
}

export function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}
