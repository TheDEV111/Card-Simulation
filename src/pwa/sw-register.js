import { PWA_CONFIG } from "./config.js";

let registration = null;

export async function registerSW() {
  if (!("serviceWorker" in navigator)) return null;

  try {
    registration = await navigator.serviceWorker.register(PWA_CONFIG.SW_PATH, {
      scope: PWA_CONFIG.SW_SCOPE,
      updateViaCache: "none",
    });

    registration.addEventListener("updatefound", () => {
      const installing = registration.installing;
      if (!installing) return;
      installing.addEventListener("statechange", () => {
        if (installing.state === "installed" && navigator.serviceWorker.controller) {
          dispatchEvent(new CustomEvent("sw:update-ready", { detail: { registration } }));
        }
      });
    });

    return registration;
  } catch (err) {
    console.warn("[SW] Registration failed:", err);
    return null;
  }
}

export function getRegistration() {
  return registration;
}

export async function unregisterSW() {
  if (!registration) return false;
  return registration.unregister();
}

export async function checkForUpdate() {
  if (!registration) return;
  try {
    await registration.update();
  } catch {}
}

export function sendSWMessage(type, payload = {}) {
  const controller = navigator.serviceWorker?.controller;
  if (!controller) return;
  controller.postMessage({ type, ...payload });
}

export function skipWaiting(reg) {
  const waiting = reg?.waiting ?? registration?.waiting;
  if (waiting) waiting.postMessage({ type: "SKIP_WAITING" });
}
