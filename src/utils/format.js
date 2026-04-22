export function formatSTX(microSTX) {
  const stx = Number(microSTX) / 1_000_000;
  if (stx === 0) return "0 STX";
  if (stx < 0.001) return `${Number(microSTX).toLocaleString()} µSTX`;
  if (stx < 1) return `${stx.toFixed(4)} STX`;
  if (stx < 1000) return `${stx.toFixed(2)} STX`;
  return `${(stx / 1000).toFixed(2)}k STX`;
}

export function formatAddress(address, chars = 6) {
  if (!address) return "";
  return `${address.slice(0, chars)}…${address.slice(-4)}`;
}

export function formatDate(isoOrMs) {
  const d = new Date(isoOrMs);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatTime(isoOrMs) {
  const d = new Date(isoOrMs);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function formatRelativeTime(isoOrMs) {
  const diff = Date.now() - new Date(isoOrMs).getTime();
  const s = Math.floor(diff / 1000);
  if (s < 60)   return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60)   return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24)   return `${h}h ago`;
  const days = Math.floor(h / 24);
  return `${days}d ago`;
}
