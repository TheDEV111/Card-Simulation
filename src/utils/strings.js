export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function truncate(str, max = 40, suffix = "…") {
  if (!str || str.length <= max) return str ?? "";
  return str.slice(0, max) + suffix;
}

export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : (plural ?? `${singular}s`);
}

export function initials(name, max = 2) {
  return name.split(" ").slice(0, max).map((w) => w[0]?.toUpperCase() ?? "").join("");
}

export function mask(str, start = 4, end = 4, char = "•") {
  if (!str || str.length <= start + end) return str ?? "";
  return `${str.slice(0, start)}${char.repeat(str.length - start - end)}${str.slice(-end)}`;
}

export function padStart(str, length, char = "0") {
  return String(str).padStart(length, char);
}
