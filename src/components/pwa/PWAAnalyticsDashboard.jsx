import { useState } from "react";
import { exportAnalytics, clearAnalytics, getEventCount } from "../../pwa/analytics.js";

const EVENT_LABELS = {
  pwa_install: "Installed",
  pwa_install_dismiss: "Install Dismissed",
  pwa_install_prompt_shown: "Install Prompt Shown",
  pwa_update_accepted: "Updates Accepted",
  pwa_update_dismissed: "Updates Dismissed",
  pwa_offline_visit: "Offline Visits",
  pwa_push_subscribed: "Push Subscribed",
  pwa_push_unsubscribed: "Push Unsubscribed",
};

export function PWAAnalyticsDashboard() {
  const [events] = useState(() => exportAnalytics());

  if (!events.length) {
    return (
      <p className="text-sm text-center py-6" style={{ color: "rgba(226,226,232,0.3)", fontFamily: "Barlow, sans-serif" }}>
        No PWA events recorded yet
      </p>
    );
  }

  const counts = Object.entries(EVENT_LABELS).map(([key, label]) => ({
    key, label, count: events.filter((e) => e.name === key).length,
  })).filter((e) => e.count > 0);

  return (
    <div className="space-y-1">
      <h3 className="text-xs font-semibold uppercase tracking-wider mb-3"
        style={{ color: "#d4a84b", fontFamily: "Barlow, sans-serif", letterSpacing: "0.08em" }}>
        PWA Events
      </h3>
      {counts.map(({ key, label, count }) => (
        <div key={key} className="flex items-center justify-between py-2 px-3 rounded-lg"
          style={{ background: "rgba(226,226,232,0.03)" }}>
          <span className="text-xs" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>{label}</span>
          <span className="text-xs font-semibold tabular-nums" style={{ color: "#d4a84b" }}>{count}</span>
        </div>
      ))}
      <p className="text-xs mt-3 text-right" style={{ color: "rgba(226,226,232,0.25)" }}>
        {events.length} total events
      </p>
    </div>
  );
}
