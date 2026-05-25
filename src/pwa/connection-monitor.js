const MONITOR_KEY = "pwa:connection-monitor";
const MAX_EVENTS = 50;

function getLog() {
  try { return JSON.parse(localStorage.getItem(MONITOR_KEY) || "[]"); }
  catch { return []; }
}

function saveLog(log) {
  localStorage.setItem(MONITOR_KEY, JSON.stringify(log.slice(-MAX_EVENTS)));
}

export function logConnectionEvent(type, detail = {}) {
  const log = getLog();
  log.push({ type, ts: Date.now(), ...detail });
  saveLog(log);
}

export function getConnectionLog() {
  return getLog();
}

export function clearConnectionLog() {
  localStorage.removeItem(MONITOR_KEY);
}

export function getOfflineCount() {
  return getLog().filter((e) => e.type === "offline").length;
}

export function getTotalOfflineMs() {
  const log = getLog();
  let total = 0;
  for (let i = 0; i < log.length - 1; i++) {
    if (log[i].type === "offline" && log[i + 1].type === "online") {
      total += log[i + 1].ts - log[i].ts;
    }
  }
  return total;
}
