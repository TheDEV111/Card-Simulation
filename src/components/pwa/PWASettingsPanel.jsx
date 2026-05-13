import { useCacheStorage } from "../../hooks/useCacheStorage.js";
import { usePushNotifications } from "../../hooks/usePushNotifications.js";
import { StorageUsageBar } from "./StorageUsageBar.jsx";
import { NotificationSettings } from "./NotificationSettings.jsx";

export function PWASettingsPanel() {
  const { totalFormatted, clearAll, loading } = useCacheStorage();
  const { isSubscribed } = usePushNotifications();

  return (
    <div className="space-y-6">
      <section>
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "#d4a84b", fontFamily: "Barlow, sans-serif", letterSpacing: "0.08em" }}>
          Notifications
        </h3>
        <NotificationSettings />
      </section>

      <section style={{ borderTop: "1px solid rgba(212,168,75,0.08)", paddingTop: "1.5rem" }}>
        <h3 className="text-xs font-semibold uppercase tracking-wider mb-3"
          style={{ color: "#d4a84b", fontFamily: "Barlow, sans-serif", letterSpacing: "0.08em" }}>
          Storage & Cache
        </h3>
        <StorageUsageBar className="mb-3" />
        <div className="flex items-center justify-between">
          <span className="text-xs" style={{ color: "rgba(226,226,232,0.45)", fontFamily: "Barlow, sans-serif" }}>
            Cached data: {totalFormatted}
          </span>
          <button
            onClick={clearAll}
            disabled={loading}
            className="text-xs font-medium disabled:opacity-40 transition-colors hover:brightness-125"
            style={{ color: "#ef4444", fontFamily: "Barlow, sans-serif" }}
          >
            Clear Cache
          </button>
        </div>
      </section>
    </div>
  );
}
