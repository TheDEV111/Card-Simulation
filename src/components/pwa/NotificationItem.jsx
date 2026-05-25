const TYPE_CONFIG = {
  tx: { icon: "💳", color: "#60a5fa" },
  win: { icon: "🏆", color: "#d4a84b" },
  loss: { icon: "🃏", color: "#ef4444" },
  system: { icon: "⚙️", color: "rgba(226,226,232,0.4)" },
};

function timeAgo(ts) {
  const diff = Date.now() - ts;
  if (diff < 60_000) return "just now";
  if (diff < 3600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86400_000) return `${Math.floor(diff / 3600_000)}h ago`;
  return `${Math.floor(diff / 86400_000)}d ago`;
}

export function NotificationItem({ notification, onRead, onDelete }) {
  const { id, type = "system", title, body, timestamp, read } = notification;
  const cfg = TYPE_CONFIG[type] ?? TYPE_CONFIG.system;

  return (
    <div
      className="flex items-start gap-3 px-4 py-3 cursor-pointer"
      style={{
        background: read ? "transparent" : "rgba(212,168,75,0.03)",
        borderLeft: read ? "none" : "2px solid rgba(212,168,75,0.3)",
        transition: "background 0.2s",
      }}
      onClick={() => onRead?.(id)}
    >
      <span className="text-lg shrink-0 mt-0.5">{cfg.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>
          {title}
        </p>
        {body && (
          <p className="text-xs mt-0.5 line-clamp-2"
            style={{ color: "rgba(226,226,232,0.5)", fontFamily: "Barlow, sans-serif" }}>
            {body}
          </p>
        )}
        <p className="text-xs mt-1" style={{ color: "rgba(226,226,232,0.25)" }}>{timeAgo(timestamp)}</p>
      </div>
      {onDelete && (
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(id); }}
          className="text-xs opacity-30 hover:opacity-60 transition-opacity shrink-0"
          style={{ color: "#e2e2e8" }}
        >✕</button>
      )}
    </div>
  );
}
