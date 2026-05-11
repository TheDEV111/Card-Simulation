export function getLocale() {
  return navigator.language || navigator.languages?.[0] || "en-US";
}

export function formatNumber(value, options = {}) {
  return new Intl.NumberFormat(getLocale(), options).format(value);
}

export function formatPercent(value, decimals = 1) {
  return new Intl.NumberFormat(getLocale(), {
    style: "percent",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value / 100);
}

export function formatRelativeTime(date, base = new Date()) {
  const diff = date - base;
  const rtf = new Intl.RelativeTimeFormat(getLocale(), { numeric: "auto" });
  const units = [
    [60, "second"],
    [3600, "minute"],
    [86400, "hour"],
    [604800, "day"],
    [2592000, "week"],
    [31536000, "month"],
    [Infinity, "year"],
  ];
  const absDiff = Math.abs(diff) / 1000;
  let prev = 1;
  for (const [limit, unit] of units) {
    if (absDiff < limit) {
      return rtf.format(Math.round(diff / 1000 / prev), unit);
    }
    prev = limit;
  }
}

export function pluralize(count, singular, plural) {
  return count === 1 ? singular : (plural ?? singular + "s");
}

export function ordinal(n) {
  const abs = Math.abs(n);
  const mod100 = abs % 100;
  const mod10 = abs % 10;
  if (mod100 >= 11 && mod100 <= 13) return `${n}th`;
  if (mod10 === 1) return `${n}st`;
  if (mod10 === 2) return `${n}nd`;
  if (mod10 === 3) return `${n}rd`;
  return `${n}th`;
}
