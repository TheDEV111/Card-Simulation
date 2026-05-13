import { usePushNotifications } from "../../hooks/usePushNotifications.js";

export function NotificationPrompt({ onSubscribed, onDismiss }) {
  const { supported, isSubscribed, permission, subscribe, loading } = usePushNotifications();

  if (!supported || isSubscribed || permission === "denied") return null;

  const handle = async () => {
    const sub = await subscribe();
    if (sub) onSubscribed?.(sub);
  };

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        background: "#1e1e2a",
        border: "1px solid rgba(212,168,75,0.2)",
      }}
    >
      <div className="flex items-start gap-4">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(212,168,75,0.1)", border: "1px solid rgba(212,168,75,0.2)" }}
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            style={{ color: "#d4a84b" }}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </div>
        <div className="flex-1">
          <p className="text-sm font-semibold mb-1" style={{ color: "#e2e2e8", fontFamily: "Cinzel, serif" }}>
            Win Alerts
          </p>
          <p className="text-xs leading-relaxed" style={{ color: "rgba(226,226,232,0.45)", fontFamily: "Barlow, sans-serif" }}>
            Get notified when your transaction confirms or a new challenge starts
          </p>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <button
          onClick={handle}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl text-xs font-semibold transition-all active:scale-95 disabled:opacity-60"
          style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
        >
          {loading ? "Enabling…" : "Enable Alerts"}
        </button>
        {onDismiss && (
          <button onClick={onDismiss}
            className="px-4 py-2.5 rounded-xl text-xs transition-colors"
            style={{ background: "rgba(226,226,232,0.06)", color: "rgba(226,226,232,0.4)" }}>
            Not now
          </button>
        )}
      </div>
    </div>
  );
}
