export function getConnectionType() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  return conn?.effectiveType ?? "unknown";
}

export function isSaveData() {
  const conn = navigator.connection;
  return Boolean(conn?.saveData);
}

export function getNetworkSpeed() {
  const conn = navigator.connection;
  return {
    downlink: conn?.downlink ?? null,
    rtt: conn?.rtt ?? null,
    effectiveType: conn?.effectiveType ?? null,
  };
}

export function isOnline() {
  return navigator.onLine;
}

export function onConnectivityChange(callback) {
  const handle = () => callback(navigator.onLine);
  window.addEventListener("online", handle);
  window.addEventListener("offline", handle);
  return () => {
    window.removeEventListener("online", handle);
    window.removeEventListener("offline", handle);
  };
}

export async function ping(url, timeout = 5000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const start = Date.now();
  try {
    await fetch(url, { method: "HEAD", mode: "no-cors", signal: controller.signal });
    return Date.now() - start;
  } catch {
    return null;
  } finally {
    clearTimeout(id);
  }
}
