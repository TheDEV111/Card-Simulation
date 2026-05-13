// Stacks Card Game — Service Worker
const CACHE_VERSION = "v1";
const STATIC_CACHE = `stacks-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE = `stacks-dynamic-${CACHE_VERSION}`;
const API_CACHE = `stacks-api-${CACHE_VERSION}`;
const FONTS_CACHE = `stacks-fonts-${CACHE_VERSION}`;

const ALL_CACHES = [STATIC_CACHE, DYNAMIC_CACHE, API_CACHE, FONTS_CACHE];

const PRECACHE_URLS = [
  "/",
  "/manifest.json",
];

const API_HOSTS = ["api.hiro.so", "stacks-node-api.mainnet.stacks.co"];
const FONT_HOSTS = ["fonts.googleapis.com", "fonts.gstatic.com"];

// --- Install ---
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// --- Activate ---
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((key) => !ALL_CACHES.includes(key))
          .map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// --- Fetch ---
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (event.request.method !== "GET") return;

  if (FONT_HOSTS.includes(url.hostname)) {
    event.respondWith(cacheFirst(event.request, FONTS_CACHE));
    return;
  }

  if (API_HOSTS.includes(url.hostname)) {
    event.respondWith(networkFirst(event.request, API_CACHE, 30_000));
    return;
  }

  if (url.pathname.startsWith("/icons/")) {
    event.respondWith(cacheFirst(event.request, STATIC_CACHE));
    return;
  }

  if (url.origin === self.location.origin) {
    event.respondWith(staleWhileRevalidate(event.request, DYNAMIC_CACHE));
    return;
  }
});

// --- Strategies ---
async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, response.clone());
  }
  return response;
}

async function networkFirst(request, cacheName, timeoutMs = 5000) {
  const cache = await caches.open(cacheName);
  try {
    const controller = new AbortController();
    const tid = setTimeout(() => controller.abort(), timeoutMs);
    const response = await fetch(request, { signal: controller.signal });
    clearTimeout(tid);
    if (response.ok) cache.put(request, response.clone());
    return response;
  } catch {
    const cached = await cache.match(request);
    if (cached) return cached;
    return new Response(JSON.stringify({ error: "offline" }), {
      headers: { "Content-Type": "application/json" },
    });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cached = await cache.match(request);
  const fetchPromise = fetch(request).then((response) => {
    if (response.ok) cache.put(request, response.clone());
    return response;
  }).catch(() => null);
  return cached ?? (await fetchPromise) ?? new Response("Offline", { status: 503 });
}

// --- Message handler ---
self.addEventListener("message", (event) => {
  if (event.data?.type === "SKIP_WAITING") self.skipWaiting();
  if (event.data?.type === "GET_VERSION") {
    event.ports[0]?.postMessage({ version: CACHE_VERSION });
  }
});
