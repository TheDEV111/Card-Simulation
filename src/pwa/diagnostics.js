import { isSWSupported, isInstalledPWA, getCacheSize, formatBytes } from "./sw-utils.js";
import { isPushSupported, checkPushPermission } from "./push-utils.js";
import { isBackgroundSyncSupported, isPeriodicSyncSupported } from "./background-sync.js";
import { PWA_CONFIG } from "./config.js";

export async function runDiagnostics() {
  const results = {
    serviceWorker: {
      supported: isSWSupported(),
      registered: !!(await navigator.serviceWorker?.getRegistration?.()),
      active: !!navigator.serviceWorker?.controller,
    },
    installability: {
      isInstalled: isInstalledPWA(),
      displayMode: window.matchMedia("(display-mode: standalone)").matches ? "standalone" : "browser",
    },
    push: {
      supported: isPushSupported(),
      permission: await checkPushPermission(),
    },
    sync: {
      backgroundSync: isBackgroundSyncSupported(),
      periodicSync: isPeriodicSyncSupported(),
    },
    storage: await (async () => {
      const estimate = await navigator.storage?.estimate?.() ?? {};
      const cacheBytes = await Promise.all(
        Object.values(PWA_CONFIG.CACHE_NAMES).map((name) => getCacheSize(name))
      );
      return {
        quota: estimate.quota ?? 0,
        usage: estimate.usage ?? 0,
        cacheBytes: cacheBytes.reduce((a, b) => a + b, 0),
        formatted: formatBytes(cacheBytes.reduce((a, b) => a + b, 0)),
      };
    })(),
    manifest: {
      linked: !!document.querySelector('link[rel="manifest"]'),
      themeColor: document.querySelector('meta[name="theme-color"]')?.content ?? null,
    },
    https: location.protocol === "https:" || location.hostname === "localhost",
  };

  return results;
}
