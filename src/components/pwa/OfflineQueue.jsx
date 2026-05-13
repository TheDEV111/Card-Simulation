export function OfflineQueue({ items = [], onRetryAll, onDismiss }) {
  if (!items.length) return null;

  return (
    <div
      className="fixed bottom-4 right-4 z-40 w-72 rounded-xl overflow-hidden shadow-2xl"
      style={{ background: "#1e1e2a", border: "1px solid rgba(212,168,75,0.2)" }}
    >
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(212,168,75,0.1)" }}>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-amber-500" />
          <span className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#d4a84b", fontFamily: "Barlow, sans-serif", letterSpacing: "0.06em" }}>
            Queued Offline
          </span>
        </div>
        <span className="text-xs px-1.5 py-0.5 rounded"
          style={{ background: "rgba(212,168,75,0.1)", color: "#d4a84b" }}>
          {items.length}
        </span>
      </div>

      <ul className="divide-y" style={{ borderColor: "rgba(212,168,75,0.05)" }}>
        {items.slice(0, 3).map((item, i) => (
          <li key={i} className="px-4 py-2.5 flex items-center justify-between">
            <div>
              <p className="text-xs font-medium" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>
                {item.label ?? `TX ${i + 1}`}
              </p>
              <p className="text-xs mt-0.5" style={{ color: "rgba(226,226,232,0.4)" }}>
                {item.description ?? "Pending send"}
              </p>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
          </li>
        ))}
        {items.length > 3 && (
          <li className="px-4 py-2 text-xs text-center" style={{ color: "rgba(226,226,232,0.4)" }}>
            +{items.length - 3} more
          </li>
        )}
      </ul>

      <div className="flex gap-2 px-4 py-3">
        <button
          onClick={onRetryAll}
          className="flex-1 py-2 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95"
          style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
        >
          Retry All
        </button>
        {onDismiss && (
          <button onClick={onDismiss}
            className="px-3 py-2 rounded-lg text-xs transition-colors"
            style={{ background: "rgba(226,226,232,0.06)", color: "rgba(226,226,232,0.5)" }}>
            Dismiss
          </button>
        )}
      </div>
    </div>
  );
}
