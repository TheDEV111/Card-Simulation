export function createPipeline(arr) {
  let data = [...arr];
  return {
    filter(fn) { data = data.filter(fn); return this; },
    map(fn) { data = data.map(fn); return this; },
    sort(fn) { data = [...data].sort(fn); return this; },
    take(n) { data = data.slice(0, n); return this; },
    skip(n) { data = data.slice(n); return this; },
    unique() { data = [...new Set(data)]; return this; },
    compact() { data = data.filter(Boolean); return this; },
    reverse() { data = [...data].reverse(); return this; },
    value() { return data; },
    count() { return data.length; },
    first() { return data[0]; },
    last() { return data[data.length - 1]; },
  };
}
