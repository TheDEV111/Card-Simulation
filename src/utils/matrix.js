export function createMatrix(rows, cols, fill = 0) {
  return Array.from({ length: rows }, () => Array(cols).fill(fill));
}

export function matrixGet(m, r, c) {
  return m[r]?.[c];
}

export function matrixSet(m, r, c, val) {
  const next = m.map((row) => [...row]);
  next[r][c] = val;
  return next;
}

export function matrixMap(m, fn) {
  return m.map((row, r) => row.map((cell, c) => fn(cell, r, c)));
}

export function matrixTranspose(m) {
  return m[0].map((_, c) => m.map((row) => row[c]));
}

export function matrixFlatten(m) {
  return m.flat();
}

export function matrixRows(m) {
  return m.length;
}

export function matrixCols(m) {
  return m[0]?.length ?? 0;
}
