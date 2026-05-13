export function isWakeLockSupported() {
  return "wakeLock" in navigator;
}

export async function acquireWakeLock(type = "screen") {
  if (!isWakeLockSupported()) throw new Error("Wake Lock API not supported");
  return navigator.wakeLock.request(type);
}

export function releaseWakeLock(sentinel) {
  if (sentinel && !sentinel.released) return sentinel.release();
  return Promise.resolve();
}

export function isWakeLockReleased(sentinel) {
  return !sentinel || sentinel.released;
}

export function onWakeLockRelease(sentinel, callback) {
  if (!sentinel) return () => {};
  sentinel.addEventListener("release", callback);
  return () => sentinel.removeEventListener("release", callback);
}
