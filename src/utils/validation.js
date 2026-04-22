export function isValidSTXAddress(address) {
  return typeof address === "string" && /^SP[A-Z0-9]{33,39}$/.test(address);
}

export function isValidStake(value, min = 1000, max = 10_000_000) {
  const n = Number(value);
  return Number.isFinite(n) && n >= min && n <= max;
}

export function isPositiveInt(value) {
  const n = Number(value);
  return Number.isInteger(n) && n > 0;
}

export function clampStake(value, min = 1000, max = 10_000_000) {
  return Math.max(min, Math.min(max, Math.round(value)));
}

export function isValidCard(card) {
  return [1, 2, 3].includes(Number(card));
}
