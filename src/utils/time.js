export function parseMs(ms) {
  const abs = Math.abs(ms);
  const hours = Math.floor(abs / 3_600_000);
  const minutes = Math.floor((abs % 3_600_000) / 60_000);
  const seconds = Math.floor((abs % 60_000) / 1_000);
  const milliseconds = abs % 1_000;
  return { hours, minutes, seconds, milliseconds };
}

export function formatDuration(ms, { short = false } = {}) {
  const { hours, minutes, seconds } = parseMs(ms);
  if (short) {
    if (hours) return `${hours}h ${minutes}m`;
    if (minutes) return `${minutes}m ${seconds}s`;
    return `${seconds}s`;
  }
  const parts = [];
  if (hours) parts.push(`${hours} hour${hours !== 1 ? "s" : ""}`);
  if (minutes) parts.push(`${minutes} minute${minutes !== 1 ? "s" : ""}`);
  if (!hours && seconds) parts.push(`${seconds} second${seconds !== 1 ? "s" : ""}`);
  return parts.join(", ") || "0 seconds";
}

export function formatCountdown(ms) {
  const { hours, minutes, seconds } = parseMs(ms);
  return [hours, minutes, seconds].map((n) => String(n).padStart(2, "0")).join(":");
}

export function isToday(date) {
  const d = new Date(date);
  const now = new Date();
  return d.toDateString() === now.toDateString();
}

export function isYesterday(date) {
  const d = new Date(date);
  const yest = new Date();
  yest.setDate(yest.getDate() - 1);
  return d.toDateString() === yest.toDateString();
}

export function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function endOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(23, 59, 59, 999);
  return d;
}

export function addDays(date, days) {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d;
}

export function diffDays(a, b) {
  return Math.floor((new Date(a) - new Date(b)) / 86_400_000);
}
