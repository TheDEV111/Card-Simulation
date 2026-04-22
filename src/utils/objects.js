export function pick(obj, keys) {
  return Object.fromEntries(keys.map((k) => [k, obj[k]]).filter(([, v]) => v !== undefined));
}

export function omit(obj, keys) {
  const set = new Set(keys);
  return Object.fromEntries(Object.entries(obj).filter(([k]) => !set.has(k)));
}

export function deepMerge(target, source) {
  const result = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === "object" && !Array.isArray(source[key])) {
      result[key] = deepMerge(target[key] ?? {}, source[key]);
    } else {
      result[key] = source[key];
    }
  }
  return result;
}

export function isEmpty(obj) {
  return Object.keys(obj ?? {}).length === 0;
}

export function mapValues(obj, fn) {
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v, k)]));
}

export function filterValues(obj, fn) {
  return Object.fromEntries(Object.entries(obj).filter(([k, v]) => fn(v, k)));
}
