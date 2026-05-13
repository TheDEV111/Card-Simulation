export const PWA_CONFIG = {
  APP_NAME: "Stacks Card Game",
  APP_SHORT_NAME: "StacksCard",
  THEME_COLOR: "#d4a84b",
  BACKGROUND_COLOR: "#0f0f14",
  SW_PATH: "/sw.js",
  SW_SCOPE: "/",
  CACHE_VERSION: "v1",
  CACHE_NAMES: {
    STATIC: "stacks-static-v1",
    DYNAMIC: "stacks-dynamic-v1",
    API: "stacks-api-v1",
    IMAGES: "stacks-images-v1",
    FONTS: "stacks-fonts-v1",
  },
  API_HOSTS: [
    "api.hiro.so",
    "stacks-node-api.mainnet.stacks.co",
  ],
  PRECACHE_URLS: ["/", "/play", "/leaderboard", "/wallet"],
  MAX_API_CACHE_AGE_MS: 30_000,
  MAX_IMAGE_CACHE_ENTRIES: 100,
  MAX_DYNAMIC_CACHE_ENTRIES: 60,
};

export const INSTALL_DISMISSED_KEY = "pwa:install-dismissed";
export const PUSH_ENDPOINT_KEY = "pwa:push-endpoint";
export const SYNC_QUEUE_KEY = "pwa:sync-queue";
export const OFFLINE_QUEUE_KEY = "pwa:offline-tx-queue";
