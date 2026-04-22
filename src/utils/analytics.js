const events = [];

export function trackEvent(name, props = {}) {
  const event = { name, props, timestamp: Date.now() };
  events.push(event);
  if (import.meta.env.DEV) console.debug("[analytics]", name, props);
}

export function trackPageView(path) {
  trackEvent("page_view", { path });
}

export function trackGamePlay(card, stake) {
  trackEvent("game_play", { card, stake });
}

export function trackGameResult(outcome, payout, stake) {
  trackEvent("game_result", { outcome, payout, stake, multiplier: payout / stake });
}

export function trackWalletConnect(address) {
  trackEvent("wallet_connect", { address: address?.slice(0, 8) + "…" });
}

export function getEventLog() {
  return [...events];
}
