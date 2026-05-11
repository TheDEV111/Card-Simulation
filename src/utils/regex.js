export const PATTERNS = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  url: /^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)$/,
  hex: /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/,
  stacksAddress: /^S[MT][0-9A-Z]{38,39}$/,
  txHash: /^0x[0-9a-fA-F]{64}$/,
  integer: /^-?\d+$/,
  decimal: /^-?\d+(\.\d+)?$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
  alphanumeric: /^[a-zA-Z0-9]+$/,
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
};

export function test(pattern, value) {
  return (PATTERNS[pattern] ?? pattern).test(value);
}

export function escape(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function highlight(text, query, tag = "mark") {
  if (!query) return text;
  const escaped = escape(query);
  return text.replace(new RegExp(`(${escaped})`, "gi"), `<${tag}>$1</${tag}>`);
}

export function extractMatches(text, pattern) {
  const re = new RegExp(pattern, "g");
  const matches = [];
  let m;
  while ((m = re.exec(text)) !== null) matches.push(m[0]);
  return matches;
}
