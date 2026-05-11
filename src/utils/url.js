export function buildQuery(params) {
  const q = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== null && v !== "") q.set(k, String(v));
  }
  return q.toString();
}

export function parseQuery(search = window.location.search) {
  const params = {};
  new URLSearchParams(search).forEach((v, k) => {
    params[k] = v;
  });
  return params;
}

export function joinPaths(...segments) {
  return segments
    .map((s) => s.replace(/^\/+|\/+$/g, ""))
    .filter(Boolean)
    .join("/");
}

export function getOrigin(url) {
  try {
    return new URL(url).origin;
  } catch {
    return null;
  }
}

export function isAbsoluteURL(url) {
  return /^https?:\/\//i.test(url);
}

export function addTrailingSlash(path) {
  return path.endsWith("/") ? path : path + "/";
}

export function removeTrailingSlash(path) {
  return path.endsWith("/") && path.length > 1 ? path.slice(0, -1) : path;
}
