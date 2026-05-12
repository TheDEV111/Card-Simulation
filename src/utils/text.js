export function truncate(str, max, suffix = "…") {
  return str.length > max ? str.slice(0, max - suffix.length) + suffix : str;
}

export function truncateMiddle(str, max, sep = "…") {
  if (str.length <= max) return str;
  const half = Math.floor((max - sep.length) / 2);
  return str.slice(0, half) + sep + str.slice(-half);
}

export function capitalize(str) {
  return str ? str[0].toUpperCase() + str.slice(1).toLowerCase() : "";
}

export function titleCase(str) {
  return str.replace(/\b\w/g, (c) => c.toUpperCase());
}

export function camelToKebab(str) {
  return str.replace(/([A-Z])/g, (m) => `-${m.toLowerCase()}`);
}

export function kebabToCamel(str) {
  return str.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export function slugify(str) {
  return str.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");
}

export function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export function countChars(str, excludeSpaces = false) {
  return excludeSpaces ? str.replace(/\s/g, "").length : str.length;
}

export function padStart(str, length, char = " ") {
  return String(str).padStart(length, char);
}

export function padEnd(str, length, char = " ") {
  return String(str).padEnd(length, char);
}

export function repeat(str, n, sep = "") {
  return Array(n).fill(str).join(sep);
}

export function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}
