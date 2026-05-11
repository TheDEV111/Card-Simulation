export function sortBy(arr, key, direction = "asc") {
  const factor = direction === "asc" ? 1 : -1;
  return [...arr].sort((a, b) => {
    const va = typeof key === "function" ? key(a) : a[key];
    const vb = typeof key === "function" ? key(b) : b[key];
    if (va == null && vb == null) return 0;
    if (va == null) return factor;
    if (vb == null) return -factor;
    if (typeof va === "string") return factor * va.localeCompare(vb);
    return factor * (va - vb);
  });
}

export function sortByMultiple(arr, criteria) {
  return [...arr].sort((a, b) => {
    for (const { key, direction = "asc" } of criteria) {
      const factor = direction === "asc" ? 1 : -1;
      const va = typeof key === "function" ? key(a) : a[key];
      const vb = typeof key === "function" ? key(b) : b[key];
      if (va == null && vb == null) continue;
      if (va == null) return factor;
      if (vb == null) return -factor;
      const cmp = typeof va === "string" ? va.localeCompare(vb) : va - vb;
      if (cmp !== 0) return factor * cmp;
    }
    return 0;
  });
}

export function naturalSort(arr, key) {
  return [...arr].sort((a, b) => {
    const va = key ? a[key] : a;
    const vb = key ? b[key] : b;
    return String(va).localeCompare(String(vb), undefined, { numeric: true, sensitivity: "base" });
  });
}

export function stableSort(arr, compare) {
  return arr
    .map((item, index) => ({ item, index }))
    .sort((a, b) => compare(a.item, b.item) || a.index - b.index)
    .map(({ item }) => item);
}
