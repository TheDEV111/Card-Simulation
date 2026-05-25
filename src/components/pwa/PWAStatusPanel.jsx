import { useEffect } from "react";
import { usePWADiagnostics } from "../../hooks/usePWADiagnostics.js";

function Check({ label, ok, note }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-2.5">
        <span
          className="w-5 h-5 rounded-full flex items-center justify-center text-xs shrink-0"
          style={{
            background: ok ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
            color: ok ? "#22c55e" : "#ef4444",
          }}
        >
          {ok ? "✓" : "✕"}
        </span>
        <span className="text-xs" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>{label}</span>
      </div>
      {note && <span className="text-xs" style={{ color: "rgba(226,226,232,0.35)" }}>{note}</span>}
    </div>
  );
}

export function PWAStatusPanel() {
  const { results, score, loading, run } = usePWADiagnostics();

  useEffect(() => { run(); }, []);

  if (loading || !results) {
    return (
      <div className="flex items-center gap-2 py-4" style={{ color: "rgba(226,226,232,0.3)" }}>
        <div className="w-4 h-4 border-2 rounded-full animate-spin"
          style={{ borderColor: "rgba(212,168,75,0.2)", borderTopColor: "#d4a84b" }} />
        <span className="text-xs" style={{ fontFamily: "Barlow, sans-serif" }}>Running diagnostics…</span>
      </div>
    );
  }

  return (
    <div className="rounded-2xl overflow-hidden"
      style={{ background: "#1e1e2a", border: "1px solid rgba(212,168,75,0.15)" }}>
      <div className="flex items-center justify-between px-4 py-3"
        style={{ borderBottom: "1px solid rgba(212,168,75,0.1)" }}>
        <span className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: "#d4a84b", fontFamily: "Barlow, sans-serif", letterSpacing: "0.08em" }}>
          PWA Status
        </span>
        <span className="text-sm font-bold tabular-nums"
          style={{ color: score >= 80 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444" }}>
          {score}/100
        </span>
      </div>
      <div className="px-4 divide-y" style={{ borderColor: "rgba(226,226,232,0.04)" }}>
        <Check label="HTTPS" ok={results.https} />
        <Check label="Service Worker" ok={results.serviceWorker.registered} note={results.serviceWorker.active ? "Active" : "Registered"} />
        <Check label="Web Manifest" ok={results.manifest.linked} />
        <Check label="Push Notifications" ok={results.push.permission === "granted"} note={results.push.permission} />
        <Check label="Background Sync" ok={results.sync.backgroundSync} />
        <Check label="Installed" ok={results.installability.isInstalled} note={results.installability.displayMode} />
        <Check label="Storage"
          ok={results.storage.cacheBytes > 0}
          note={results.storage.formatted} />
      </div>
      <div className="px-4 py-3 text-right">
        <button onClick={run} className="text-xs" style={{ color: "rgba(212,168,75,0.6)", fontFamily: "Barlow, sans-serif" }}>
          Refresh
        </button>
      </div>
    </div>
  );
}
