export function toJSON(value, fallback = null) {
  try {
    return JSON.stringify(value);
  } catch {
    return fallback;
  }
}

export function fromJSON(str, fallback = null) {
  try {
    return JSON.parse(str);
  } catch {
    return fallback;
  }
}

export function deepClone(value) {
  return fromJSON(toJSON(value));
}

export function encodeBase64(str) {
  return btoa(unescape(encodeURIComponent(str)));
}

export function decodeBase64(str) {
  try {
    return decodeURIComponent(escape(atob(str)));
  } catch {
    return null;
  }
}

export function encodeSearchParam(value) {
  return encodeURIComponent(toJSON(value));
}

export function decodeSearchParam(str) {
  return fromJSON(decodeURIComponent(str));
}

export function pick(obj, keys) {
  return Object.fromEntries(keys.filter((k) => k in obj).map((k) => [k, obj[k]]));
}

export function omit(obj, keys) {
  const set = new Set(keys);
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !set.has(k)));
}
