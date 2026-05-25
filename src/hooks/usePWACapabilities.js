import { isSWSupported } from "../pwa/sw-utils.js";
import { isWakeLockSupported } from "../pwa/wake-lock.js";
import { isBatterySupported } from "../pwa/battery.js";
import { isWebShareSupported } from "../pwa/share.js";

export function usePWACapabilities() {
  return {
    serviceWorker: isSWSupported(),
    wakeLock: isWakeLockSupported(),
    battery: isBatterySupported(),
    share: isWebShareSupported(),
    push: "PushManager" in window,
    backgroundSync: "SyncManager" in window,
    periodicSync: "PeriodicSyncManager" in window,
    storageEstimate: !!navigator.storage?.estimate,
    persistStorage: !!navigator.storage?.persist,
    notifications: "Notification" in window,
    indexedDB: "indexedDB" in window,
    networkInfo: !!(navigator.connection || navigator.mozConnection || navigator.webkitConnection),
  };
}
