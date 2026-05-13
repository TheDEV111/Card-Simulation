import { useNotificationCenter } from "../../hooks/useNotificationCenter.js";
import { NotificationItem } from "./NotificationItem.jsx";

export function NotificationCenter({ onClose }) {
  const { notifications, unread, readAll, remove, clear } = useNotificationCenter();

  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden shadow-2xl"
      style={{
        background: "#1e1e2a",
        border: "1px solid rgba(212,168,75,0.2)",
        maxHeight: "480px",
        width: "340px",
      }}
    >
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(212,168,75,0.1)" }}>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold" style={{ color: "#d4a84b", fontFamily: "Cinzel, serif" }}>
            Notifications
          </span>
          {unread > 0 && (
            <span className="px-1.5 py-0.5 rounded-full text-xs font-bold"
              style={{ background: "rgba(212,168,75,0.15)", color: "#d4a84b" }}>
              {unread}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          {unread > 0 && (
            <button onClick={readAll} className="text-xs"
              style={{ color: "rgba(212,168,75,0.6)", fontFamily: "Barlow, sans-serif" }}>
              Mark all read
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="opacity-40 hover:opacity-70"
              style={{ color: "#e2e2e8" }}>✕</button>
          )}
        </div>
      </div>

      <div className="overflow-y-auto flex-1">
        {!notifications.length ? (
          <div className="flex flex-col items-center justify-center py-12 gap-2">
            <p className="text-sm" style={{ color: "rgba(226,226,232,0.25)", fontFamily: "Barlow, sans-serif" }}>
              No notifications
            </p>
          </div>
        ) : (
          <ul className="divide-y" style={{ borderColor: "rgba(226,226,232,0.04)" }}>
            {notifications.map((n) => (
              <li key={n.id}>
                <NotificationItem notification={n} onDelete={remove} />
              </li>
            ))}
          </ul>
        )}
      </div>

      {notifications.length > 0 && (
        <div className="px-4 py-2.5" style={{ borderTop: "1px solid rgba(226,226,232,0.04)" }}>
          <button onClick={clear} className="text-xs w-full text-center"
            style={{ color: "rgba(239,68,68,0.5)", fontFamily: "Barlow, sans-serif" }}>
            Clear all
          </button>
        </div>
      )}
    </div>
  );
}
