const EVENTS_KEY = "pwa:analytics-events";
const MAX_EVENTS = 200;

function getEvents() {
  try { return JSON.parse(localStorage.getItem(EVENTS_KEY) ?? "[]"); } catch { return []; }
}

function saveEvents(events) {
  localStorage.setItem(EVENTS_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
}

export function trackPWAEvent(name, data = {}) {
  const events = getEvents();
  events.push({ name, data, ts: Date.now() });
  saveEvents(events);
  if (typeof window.__pwaAnalyticsHook === "function") window.__pwaAnalyticsHook(name, data);
}

export function trackInstall() { trackPWAEvent("pwa_install"); }
export function trackInstallDismiss() { trackPWAEvent("pwa_install_dismiss"); }
export function trackInstallPromptShown() { trackPWAEvent("pwa_install_prompt_shown"); }
export function trackUpdateAccepted() { trackPWAEvent("pwa_update_accepted"); }
export function trackUpdateDismissed() { trackPWAEvent("pwa_update_dismissed"); }
export function trackOfflineVisit(path) { trackPWAEvent("pwa_offline_visit", { path }); }
export function trackCacheHit(url) { trackPWAEvent("pwa_cache_hit", { url }); }
export function trackPushSubscribed() { trackPWAEvent("pwa_push_subscribed"); }
export function trackPushUnsubscribed() { trackPWAEvent("pwa_push_unsubscribed"); }

export function getEventCount(name) {
  return getEvents().filter((e) => e.name === name).length;
}

export function clearAnalytics() {
  localStorage.removeItem(EVENTS_KEY);
}

export function exportAnalytics() {
  return getEvents();
}
