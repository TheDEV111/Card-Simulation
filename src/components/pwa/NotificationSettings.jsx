import { usePushNotifications } from "../../hooks/usePushNotifications.js";

const NOTIFICATION_TYPES = [
  { id: "tx", label: "Transaction Confirmed", desc: "When your STX transaction lands on-chain" },
  { id: "win", label: "Game Results", desc: "Win/loss notifications after a round" },
  { id: "challenge", label: "New Challenges", desc: "Daily challenge and special events" },
];

export function NotificationSettings() {
  const { supported, isSubscribed, permission, subscribe, unsubscribe, loading } = usePushNotifications();

  if (!supported) {
    return (
      <p className="text-sm" style={{ color: "rgba(226,226,232,0.4)", fontFamily: "Barlow, sans-serif" }}>
        Push notifications are not supported in this browser.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold" style={{ color: "#e2e2e8", fontFamily: "Cinzel, serif" }}>
            Push Notifications
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(226,226,232,0.4)", fontFamily: "Barlow, sans-serif" }}>
            {permission === "denied" ? "Blocked in browser settings" : isSubscribed ? "Active" : "Disabled"}
          </p>
        </div>
        <button
          onClick={isSubscribed ? unsubscribe : subscribe}
          disabled={loading || permission === "denied"}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40"
          style={{
            background: isSubscribed ? "rgba(239,68,68,0.1)" : "#d4a84b",
            color: isSubscribed ? "#ef4444" : "#0f0f14",
            border: isSubscribed ? "1px solid rgba(239,68,68,0.2)" : "none",
            fontFamily: "Barlow, sans-serif",
          }}
        >
          {loading ? "…" : isSubscribed ? "Disable" : "Enable"}
        </button>
      </div>

      {isSubscribed && (
        <ul className="space-y-2 pt-2" style={{ borderTop: "1px solid rgba(212,168,75,0.1)" }}>
          {NOTIFICATION_TYPES.map(({ id, label, desc }) => (
            <li key={id} className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-medium" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>{label}</p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(226,226,232,0.35)" }}>{desc}</p>
              </div>
              <input type="checkbox" defaultChecked className="mt-0.5 accent-amber-400" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
