export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function round(value, decimals = 0) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function sum(arr) {
  return arr.reduce((s, v) => s + v, 0);
}

export function avg(arr) {
  return arr.length === 0 ? 0 : sum(arr) / arr.length;
}

export function median(arr) {
  if (arr.length === 0) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function percentile(arr, p) {
  const sorted = [...arr].sort((a, b) => a - b);
  const idx = Math.ceil((p / 100) * sorted.length) - 1;
  return sorted[Math.max(0, idx)];
}

export function range(min, max, step = 1) {
  const result = [];
  for (let i = min; i <= max; i += step) result.push(i);
  return result;
}
