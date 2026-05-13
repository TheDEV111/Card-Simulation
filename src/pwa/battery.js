export function isBatterySupported() {
  return "getBattery" in navigator;
}

export async function getBattery() {
  if (!isBatterySupported()) return null;
  return navigator.getBattery();
}

export function getBatteryLevel(battery) {
  return battery ? Math.round(battery.level * 100) : null;
}

export function isBatteryCharging(battery) {
  return battery ? battery.charging : null;
}

export function getBatteryStatus(level, charging) {
  if (charging) return "charging";
  if (level === null) return "unknown";
  if (level <= 10) return "critical";
  if (level <= 25) return "low";
  if (level <= 60) return "medium";
  return "good";
}
