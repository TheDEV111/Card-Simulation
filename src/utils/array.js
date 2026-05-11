export function chunk(arr, size) {
  const result = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

export function unique(arr, key) {
  if (!key) return [...new Set(arr)];
  const seen = new Set();
  return arr.filter((item) => {
    const k = item[key];
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

export function sortBy(arr, key, dir = "asc") {
  return [...arr].sort((a, b) => {
    const diff = a[key] > b[key] ? 1 : a[key] < b[key] ? -1 : 0;
    return dir === "asc" ? diff : -diff;
  });
}

export function sumBy(arr, key) {
  return arr.reduce((acc, item) => acc + (item[key] || 0), 0);
}
