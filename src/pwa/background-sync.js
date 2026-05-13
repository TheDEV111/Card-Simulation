import { getRegistration } from "./sw-register.js";

const SYNC_TAG = "stacks-sync";
const PERIODIC_TAG = "stacks-periodic-sync";

export async function requestBackgroundSync() {
  const reg = getRegistration();
  if (!reg?.sync) return false;
  try {
    await reg.sync.register(SYNC_TAG);
    return true;
  } catch {
    return false;
  }
}

export async function requestPeriodicSync(minInterval = 24 * 60 * 60 * 1000) {
  const reg = getRegistration();
  if (!reg?.periodicSync) return false;
  try {
    const status = await navigator.permissions.query({ name: "periodic-background-sync" });
    if (status.state !== "granted") return false;
    await reg.periodicSync.register(PERIODIC_TAG, { minInterval });
    return true;
  } catch {
    return false;
  }
}

export async function unregisterPeriodicSync() {
  const reg = getRegistration();
  try {
    await reg?.periodicSync?.unregister(PERIODIC_TAG);
  } catch {}
}

export function isBackgroundSyncSupported() {
  return "SyncManager" in window;
}

export function isPeriodicSyncSupported() {
  return "PeriodicSyncManager" in window;
}
