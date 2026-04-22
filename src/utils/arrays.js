export function groupBy(arr, key) {
  return arr.reduce((groups, item) => {
    const k = typeof key === "function" ? key(item) : item[key];
    if (!groups[k]) groups[k] = [];
    groups[k].push(item);
    return groups;
  }, {});
}

export function unique(arr, key) {
  if (!key) return [...new Set(arr)];
  const seen = new Set();
  return arr.filter((item) => {
    const k = typeof key === "function" ? key(item) : item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) result.push(arr.slice(i, i + size));
  return result;
}

export function flatten(arr, depth = 1) {
  return depth > 0
    ? arr.reduce((flat, item) => flat.concat(Array.isArray(item) ? flatten(item, depth - 1) : item), [])
    : arr.slice();
}

export function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function sortBy(arr, key, dir = "asc") {
  return [...arr].sort((a, b) => {
    const av = typeof key === "function" ? key(a) : a[key];
    const bv = typeof key === "function" ? key(b) : b[key];
    return dir === "asc" ? (av > bv ? 1 : -1) : (av < bv ? 1 : -1);
  });
}
