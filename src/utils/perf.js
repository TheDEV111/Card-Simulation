export function throttle(fn, limit = 100) {
  let last = 0;
  return (...args) => {
    const now = Date.now();
    if (now - last >= limit) { last = now; fn(...args); }
  };
}

export function debounce(fn, delay = 300) {
  let id;
  return (...args) => { clearTimeout(id); id = setTimeout(() => fn(...args), delay); };
}

export function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

export function once(fn) {
  let called = false, result;
  return (...args) => { if (!called) { called = true; result = fn(...args); } return result; };
}
