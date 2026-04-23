export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function lerp(a, b, t) {
  return a + (b - a) * t;
}

export function normalize(value, min, max) {
  if (max === min) return 0;
  return (value - min) / (max - min);
}

export function roundTo(value, decimals = 2) {
  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}

export function pct(numerator, denominator, decimals = 1) {
  if (!denominator) return 0;
  return roundTo((numerator / denominator) * 100, decimals);
}
