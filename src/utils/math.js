export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function inverseLerp(a, b, value) {
  return (value - a) / (b - a);
}

export function remap(value, inMin, inMax, outMin, outMax) {
  return lerp(outMin, outMax, inverseLerp(inMin, inMax, value));
}

export function round(value, decimals = 0) {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}

export function sum(arr) {
  return arr.reduce((acc, v) => acc + v, 0);
}

export function avg(arr) {
  return arr.length ? sum(arr) / arr.length : 0;
}

export function median(arr) {
  if (!arr.length) return 0;
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

export function stdDev(arr) {
  const mean = avg(arr);
  const variance = avg(arr.map((v) => (v - mean) ** 2));
  return Math.sqrt(variance);
}

export function isPowerOfTwo(n) {
  return n > 0 && (n & (n - 1)) === 0;
}

export function nextPowerOfTwo(n) {
  let p = 1;
  while (p < n) p <<= 1;
  return p;
}
