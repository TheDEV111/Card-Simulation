export function capitalize(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : (plural || singular + "s");
}

export function slugify(str) {
  return str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]/g, "");
}

export function truncate(str, maxLength, ellipsis = "…") {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + ellipsis;
}
