export function toCSV(rows, headers) {
  const cols = headers ?? Object.keys(rows[0] ?? {});
  const escape = (v) => {
    const s = String(v ?? "");
    return s.includes(",") || s.includes('"') || s.includes("\n")
      ? `"${s.replace(/"/g, '""')}"`
      : s;
  };
  const lines = [
    cols.join(","),
    ...rows.map((row) => cols.map((c) => escape(row[c])).join(",")),
  ];
  return lines.join("\n");
}

export function fromCSV(text, { header = true } = {}) {
  const lines = text.trim().split(/\r?\n/);
  if (!lines.length) return [];
  const cols = header ? lines[0].split(",") : null;
  const dataLines = header ? lines.slice(1) : lines;
  return dataLines.map((line) => {
    const values = line.match(/("(?:[^"]|"")*"|[^,]*)/g) ?? [];
    const cleaned = values.filter((_, i) => i % 2 === 0).map((v) =>
      v.startsWith('"') ? v.slice(1, -1).replace(/""/g, '"') : v
    );
    if (cols) {
      return Object.fromEntries(cols.map((c, i) => [c, cleaned[i] ?? ""]));
    }
    return cleaned;
  });
}

export function downloadCSV(filename, rows, headers) {
  const blob = new Blob([toCSV(rows, headers)], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
