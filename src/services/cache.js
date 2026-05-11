export function createCache({ ttl = 60_000, maxSize = 100 } = {}) {
  const store = new Map();

  function set(key, value) {
    if (store.size >= maxSize) {
      const oldest = store.keys().next().value;
      store.delete(oldest);
    }
    store.set(key, { value, expires: Date.now() + ttl });
  }

  function get(key) {
    const entry = store.get(key);
    if (!entry) return undefined;
    if (Date.now() > entry.expires) {
      store.delete(key);
      return undefined;
    }
    return entry.value;
  }

  function has(key) {
    return get(key) !== undefined;
  }

  function del(key) {
    store.delete(key);
  }

  function clear() {
    store.clear();
  }

  function prune() {
    const now = Date.now();
    for (const [k, v] of store) {
      if (now > v.expires) store.delete(k);
    }
  }

  function size() {
    return store.size;
  }

  return { get, set, has, delete: del, clear, prune, size };
}

export async function withCache(cache, key, fn) {
  if (cache.has(key)) return cache.get(key);
  const result = await fn();
  cache.set(key, result);
  return result;
}
