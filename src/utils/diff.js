export function shallowEqual(a, b) {
  if (a === b) return true;
  if (!a || !b || typeof a !== "object" || typeof b !== "object") return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => Object.is(a[k], b[k]));
}

export function deepEqual(a, b) {
  if (Object.is(a, b)) return true;
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    return a.every((v, i) => deepEqual(v, b[i]));
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) return false;
    return keysA.every((k) => deepEqual(a[k], b[k]));
  }
  return false;
}

export function objectDiff(prev, next) {
  const added = {};
  const removed = {};
  const changed = {};
  const allKeys = new Set([...Object.keys(prev), ...Object.keys(next)]);
  for (const k of allKeys) {
    if (!(k in prev)) added[k] = next[k];
    else if (!(k in next)) removed[k] = prev[k];
    else if (!Object.is(prev[k], next[k])) changed[k] = { from: prev[k], to: next[k] };
  }
  return { added, removed, changed };
}

export function arrayDiff(prev, next) {
  const prevSet = new Set(prev);
  const nextSet = new Set(next);
  return {
    added: next.filter((v) => !prevSet.has(v)),
    removed: prev.filter((v) => !nextSet.has(v)),
  };
}
