import { enqueue } from "./sync-queue.js";
import { isInstalledPWA } from "./sw-utils.js";

const originalFetch = window.fetch.bind(window);

let interceptorActive = false;

export function installNetworkMiddleware() {
  if (interceptorActive) return;
  interceptorActive = true;

  window.fetch = async (input, init = {}) => {
    const url = typeof input === "string" ? input : input.url;
    const method = (init.method ?? "GET").toUpperCase();

    try {
      return await originalFetch(input, init);
    } catch (err) {
      if (!navigator.onLine && method !== "GET") {
        const body = init.body ? JSON.parse(init.body) : null;
        enqueue({ type: "fetch", url, method, body, label: `${method} ${new URL(url).pathname}` });
      }
      throw err;
    }
  };
}

export function removeNetworkMiddleware() {
  if (!interceptorActive) return;
  window.fetch = originalFetch;
  interceptorActive = false;
}

export function isMiddlewareActive() {
  return interceptorActive;
}
