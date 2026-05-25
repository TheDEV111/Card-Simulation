export async function getStorageEstimate() {
  if (!navigator.storage?.estimate) return null;
  const { usage = 0, quota = 0 } = await navigator.storage.estimate();
  const percent = quota > 0 ? Math.round((usage / quota) * 100) : 0;
  return { usage, quota, percent, free: quota - usage };
}

export function formatStorageBytes(bytes) {
  if (bytes === 0) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(i > 1 ? 1 : 0)} ${units[i]}`;
}

export function getStorageLevel(percent) {
  if (percent >= 90) return "critical";
  if (percent >= 70) return "warning";
  return "ok";
}

export async function requestPersistentStorage() {
  if (!navigator.storage?.persist) return false;
  return navigator.storage.persist();
}

export async function isPersistentStorage() {
  if (!navigator.storage?.persisted) return false;
  return navigator.storage.persisted();
}
