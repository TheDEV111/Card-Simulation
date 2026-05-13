const STATUS_CONFIG = {
  queued: { label: "Queued", color: "#f59e0b" },
  pending: { label: "Sending…", color: "#60a5fa" },
  broadcast: { label: "Broadcast", color: "#22c55e" },
  failed: { label: "Failed", color: "#ef4444" },
};

export function TxQueuePanel({ queue = [], flushing, onFlush, onCancel }) {
  if (!queue.length) return null;

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#1e1e2a", border: "1px solid rgba(212,168,75,0.15)" }}>
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(212,168,75,0.1)" }}>
        <span className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#d4a84b", fontFamily: "Barlow, sans-serif", letterSpacing: "0.08em" }}>
          Offline TX Queue
        </span>
        <span className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: "rgba(212,168,75,0.1)", color: "#d4a84b" }}>
          {queue.length}
        </span>
      </div>

      <ul className="divide-y" style={{ borderColor: "rgba(226,226,232,0.04)" }}>
        {queue.map((tx) => {
          const cfg = STATUS_CONFIG[tx.status] ?? STATUS_CONFIG.queued;
          return (
            <li key={tx.id} className="px-4 py-3 flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate"
                  style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>
                  {tx.label ?? `${tx.type ?? "TX"} · ${tx.amount ?? ""}µSTX`}
                </p>
                <p className="text-xs mt-0.5" style={{ color: cfg.color }}>{cfg.label}</p>
              </div>
              {tx.status === "queued" && onCancel && (
                <button onClick={() => onCancel(tx.id)}
                  className="text-xs opacity-40 hover:opacity-70 transition-opacity"
                  style={{ color: "#e2e2e8" }}>✕</button>
              )}
            </li>
          );
        })}
      </ul>

      {onFlush && (
        <div className="px-4 py-3" style={{ borderTop: "1px solid rgba(212,168,75,0.08)" }}>
          <button onClick={onFlush} disabled={flushing}
            className="w-full py-2 rounded-xl text-xs font-semibold transition-all disabled:opacity-50"
            style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}>
            {flushing ? "Sending…" : "Send All Now"}
          </button>
        </div>
      )}
    </div>
  );
}
