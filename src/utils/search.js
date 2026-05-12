export function fuzzyMatch(str, query) {
  const s = str.toLowerCase();
  const q = query.toLowerCase();
  let si = 0;
  for (let qi = 0; qi < q.length; qi++) {
    si = s.indexOf(q[qi], si);
    if (si === -1) return false;
    si++;
  }
  return true;
}

export function fuzzyScore(str, query) {
  if (!query) return 1;
  const s = str.toLowerCase();
  const q = query.toLowerCase();
  let score = 0;
  let lastIndex = -1;
  for (const ch of q) {
    const idx = s.indexOf(ch, lastIndex + 1);
    if (idx === -1) return 0;
    score += 1 / (1 + idx - lastIndex - 1);
    lastIndex = idx;
  }
  return score / q.length;
}

export function searchItems(items, query, keys) {
  if (!query) return items;
  return items
    .map((item) => {
      const text = keys.map((k) => String(item[k] ?? "")).join(" ");
      const score = fuzzyScore(text, query);
      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

export function highlightMatches(text, query) {
  if (!query) return text;
  const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  return text.replace(regex, "**$1**");
}
