import { useConnectionHistory } from "../../hooks/useConnectionHistory.js";

function formatMs(ms) {
  if (ms < 1000) return `${ms}ms`;
  if (ms < 60000) return `${(ms / 1000).toFixed(1)}s`;
  return `${Math.floor(ms / 60000)}m ${Math.floor((ms % 60000) / 1000)}s`;
}

function timeAgo(ts) {
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

export function ConnectionHistoryPanel() {
  const { log, offlineCount, totalOfflineMs, clear } = useConnectionHistory();

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: 11, color: "#d4a84b", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase" }}>
          Connection History
        </p>
        {log.length > 0 && (
          <button onClick={clear} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "Barlow, sans-serif", fontSize: 11, color: "rgba(239,68,68,0.6)",
          }}>Clear</button>
        )}
      </div>
      {log.length === 0 ? (
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, color: "rgba(226,226,232,0.25)", textAlign: "center", padding: "16px 0" }}>
          No connection events recorded
        </p>
      ) : (
        <>
          <div style={{ display: "flex", gap: 16, marginBottom: 10 }}>
            <div style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, color: "rgba(226,226,232,0.5)" }}>
              <span style={{ color: "#ef4444", fontWeight: 600 }}>{offlineCount}</span> drops
            </div>
            <div style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, color: "rgba(226,226,232,0.5)" }}>
              <span style={{ color: "#f59e0b", fontWeight: 600 }}>{formatMs(totalOfflineMs)}</span> total offline
            </div>
          </div>
          <div style={{ maxHeight: 160, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 }}>
            {[...log].reverse().map((event, i) => (
              <div key={i} style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "4px 8px",
                borderRadius: 6,
                background: "rgba(226,226,232,0.02)",
                fontFamily: "Barlow, sans-serif",
                fontSize: 11,
              }}>
                <span style={{ color: event.type === "online" ? "#22c55e" : "#ef4444", fontWeight: 600 }}>
                  {event.type === "online" ? "↑ Online" : "↓ Offline"}
                </span>
                <span style={{ color: "rgba(226,226,232,0.3)" }}>{timeAgo(event.ts)}</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
