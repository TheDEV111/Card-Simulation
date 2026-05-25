import { useBackgroundSync } from "../../hooks/useBackgroundSync.js";

export function BackgroundSyncIndicator({ className = "" }) {
  const { queueSize, syncing, lastSyncAt } = useBackgroundSync();

  if (queueSize === 0 && !syncing) return null;

  const timeAgo = lastSyncAt
    ? (() => {
        const diff = Math.floor((Date.now() - lastSyncAt) / 1000);
        if (diff < 60) return `${diff}s ago`;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        return `${Math.floor(diff / 3600)}h ago`;
      })()
    : null;

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      style={{
        padding: "6px 12px",
        borderRadius: 20,
        background: "#16161e",
        border: "1px solid rgba(212,168,75,0.15)",
        fontFamily: "Barlow, sans-serif",
        fontSize: 12,
        color: "rgba(226,226,232,0.55)",
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
      }}
    >
      {syncing ? (
        <>
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              border: "1.5px solid #d4a84b",
              borderTopColor: "transparent",
              animation: "spin 0.8s linear infinite",
              display: "inline-block",
              flexShrink: 0,
            }}
          />
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
          <span style={{ color: "#d4a84b" }}>Syncing…</span>
        </>
      ) : (
        <>
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#f59e0b",
              boxShadow: "0 0 4px #f59e0b",
              flexShrink: 0,
            }}
          />
          <span>
            {queueSize} pending{queueSize !== 1 ? " items" : " item"}
            {timeAgo ? ` · last sync ${timeAgo}` : ""}
          </span>
        </>
      )}
    </div>
  );
}
