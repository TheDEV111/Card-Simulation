export function djb2(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 33) ^ str.charCodeAt(i);
  }
  return hash >>> 0;
}

export function fnv1a(str) {
  let hash = 2166136261;
  for (let i = 0; i < str.length; i++) {
    hash ^= str.charCodeAt(i);
    hash = (hash * 16777619) >>> 0;
  }
  return hash;
}

export function toHex(num) {
  return (num >>> 0).toString(16).padStart(8, "0");
}

export function hashColor(str) {
  const h = djb2(str) % 360;
  return `hsl(${h}, 60%, 50%)`;
}

export function hashIndex(str, range) {
  return djb2(str) % range;
}
