import { useSWUpdate } from "../../hooks/useSWUpdate.js";

export function UpdateBanner() {
  const { updateAvailable, updating, apply, dismiss } = useSWUpdate();

  if (!updateAvailable) return null;

  return (
    <div
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 py-3"
      style={{
        background: "#1e1e2a",
        borderBottom: "1px solid rgba(212,168,75,0.3)",
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
      }}
    >
      <div className="flex items-center gap-3">
        <span className="w-2 h-2 rounded-full" style={{ background: "#d4a84b", boxShadow: "0 0 8px #d4a84b" }} />
        <span className="text-sm" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>
          A new version is available
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          onClick={apply}
          disabled={updating}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-60"
          style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
        >
          {updating ? "Updating…" : "Update Now"}
        </button>
        <button onClick={dismiss} className="text-xs opacity-40 hover:opacity-70 transition-opacity"
          style={{ color: "#e2e2e8" }}>✕</button>
      </div>
    </div>
  );
}
