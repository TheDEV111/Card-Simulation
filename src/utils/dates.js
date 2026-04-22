export function relativeTime(timestamp) {
  const diff = Date.now() - new Date(timestamp).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60)   return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  const d = Math.floor(h / 24);
  if (d < 7)    return `${d}d ago`;
  const w = Math.floor(d / 7);
  if (w < 4)    return `${w}w ago`;
  return new Date(timestamp).toLocaleDateString("en", { month: "short", day: "numeric" });
}

export function formatDate(date, opts = {}) {
  return new Date(date).toLocaleDateString("en", { month: "short", day: "numeric", year: "numeric", ...opts });
}

export function formatTime(date, opts = {}) {
  return new Date(date).toLocaleTimeString("en", { hour: "2-digit", minute: "2-digit", ...opts });
}

export function formatDateTime(date) {
  return `${formatDate(date)} ${formatTime(date)}`;
}

export function startOfDay(date = new Date()) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function daysBetween(a, b) {
  return Math.abs(Math.floor((new Date(b) - new Date(a)) / 86_400_000));
}
