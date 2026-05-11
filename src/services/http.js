const DEFAULT_TIMEOUT = 15_000;

function applyTimeout(promise, ms) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error("Request timed out")), ms)
    ),
  ]);
}

export async function request(url, options = {}) {
  const { timeout = DEFAULT_TIMEOUT, ...rest } = options;
  const res = await applyTimeout(fetch(url, rest), timeout);
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    const err = new Error(`HTTP ${res.status}: ${res.statusText}`);
    err.status = res.status;
    err.body = body;
    throw err;
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const http = {
  get: (url, opts) => request(url, { method: "GET", ...opts }),
  post: (url, body, opts) =>
    request(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...opts,
    }),
  put: (url, body, opts) =>
    request(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...opts,
    }),
  patch: (url, body, opts) =>
    request(url, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      ...opts,
    }),
  delete: (url, opts) => request(url, { method: "DELETE", ...opts }),
};
