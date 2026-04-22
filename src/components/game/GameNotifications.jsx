import { useNotifications } from "../../context/NotificationContext";
import { useState } from "react";

export default function GameNotifications({ className = "" }) {
  const { notifications, unreadCount, markAllRead } = useNotifications();
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={() => { setOpen((o) => !o); if (!open) markAllRead(); }}
        aria-label={`Notifications — ${unreadCount} unread`}
        className="relative text-white/30 hover:text-white/60 transition-colors"
      >
        <span aria-hidden="true">🔔</span>
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-gold text-black text-[8px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-8 right-0 z-50 w-64 bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden">
          <div className="px-3 py-2 border-b border-white/8">
            <p className="text-xs font-semibold text-white/50">Notifications</p>
          </div>
          <div className="max-h-48 overflow-y-auto divide-y divide-white/5">
            {notifications.length === 0 ? (
              <p className="px-3 py-4 text-xs text-white/25 text-center">No notifications</p>
            ) : notifications.slice(0, 10).map((n) => (
              <div key={n.id} className="px-3 py-2.5">
                <p className="text-xs text-white/60">{n.message}</p>
                <p className="text-[10px] text-white/25 mt-0.5">{new Date(n.timestamp).toLocaleTimeString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
