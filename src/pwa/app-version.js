import { PWA_CONFIG } from "./config.js";

const VERSION_KEY = "pwa:app-version";

export function getCurrentVersion() {
  return PWA_CONFIG.VERSION;
}

export function getStoredVersion() {
  return localStorage.getItem(VERSION_KEY);
}

export function storeVersion(version = PWA_CONFIG.VERSION) {
  localStorage.setItem(VERSION_KEY, version);
}

export function isFirstRun() {
  return !getStoredVersion();
}

export function hasVersionChanged() {
  const stored = getStoredVersion();
  return stored !== null && stored !== PWA_CONFIG.VERSION;
}

export function markVersionSeen() {
  storeVersion(PWA_CONFIG.VERSION);
}
