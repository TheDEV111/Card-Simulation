export function groupBy(arr, key) {
  const keyFn = typeof key === "function" ? key : (item) => item[key];
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    if (!acc[k]) acc[k] = [];
    acc[k].push(item);
    return acc;
  }, {});
}

export function countBy(arr, key) {
  const keyFn = typeof key === "function" ? key : (item) => item[key];
  return arr.reduce((acc, item) => {
    const k = keyFn(item);
    acc[k] = (acc[k] ?? 0) + 1;
    return acc;
  }, {});
}

export function keyBy(arr, key) {
  const keyFn = typeof key === "function" ? key : (item) => item[key];
  return arr.reduce((acc, item) => {
    acc[keyFn(item)] = item;
    return acc;
  }, {});
}

export function indexBy(arr, key) {
  const keyFn = typeof key === "function" ? key : (item) => item[key];
  const result = new Map();
  arr.forEach((item) => result.set(keyFn(item), item));
  return result;
}

export function partition(arr, predicate) {
  const pass = [];
  const fail = [];
  arr.forEach((item) => (predicate(item) ? pass : fail).push(item));
  return [pass, fail];
}

export function chunk(arr, size) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += size) chunks.push(arr.slice(i, i + size));
  return chunks;
}

export function zip(...arrays) {
  const len = Math.max(...arrays.map((a) => a.length));
  return Array.from({ length: len }, (_, i) => arrays.map((a) => a[i]));
}

export function unzip(arrays) {
  return zip(...arrays);
}
