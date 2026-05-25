import { registerSW } from "./sw-register.js";
import { prefetchGameAssets } from "./prefetch.js";
import { pruneAllCaches } from "./cache-manager.js";
import { trackPWAEvent } from "./analytics.js";

let initialized = false;

export async function initPWA({ prefetch = true, prune = true, analytics = true } = {}) {
  if (initialized) return;
  initialized = true;

  const reg = await registerSW();

  if (analytics && reg) {
    trackPWAEvent("pwa_sw_registered", { scope: reg.scope });
  }

  window.addEventListener("appinstalled", () => {
    if (analytics) trackPWAEvent("pwa_install");
  });

  window.addEventListener("offline", () => {
    if (analytics) trackPWAEvent("pwa_offline_start");
  });

  window.addEventListener("online", () => {
    if (analytics) trackPWAEvent("pwa_online_restore");
  });

  if (prefetch && navigator.onLine) {
    await prefetchGameAssets().catch(() => {});
  }

  if (prune) {
    await pruneAllCaches().catch(() => {});
  }

  return reg;
}
