import { useSWUpdate } from "../../hooks/useSWUpdate.js";

export function ForceUpdateGate({ minVersion, currentVersion, children }) {
  const { updateAvailable, apply, updating } = useSWUpdate();

  const needsForce = minVersion && currentVersion && currentVersion < minVersion;

  if (!needsForce && !updateAvailable) return children;
  if (!needsForce) return children;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#0f0f14" }}>
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
        style={{ background: "rgba(212,168,75,0.1)", border: "1px solid rgba(212,168,75,0.2)" }}>
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          style={{ color: "#d4a84b" }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
        </svg>
      </div>
      <h2 className="text-xl font-bold mb-2"
        style={{ fontFamily: "Cinzel, serif", color: "#d4a84b" }}>Update Required</h2>
      <p className="text-sm mb-6" style={{ color: "rgba(226,226,232,0.5)", fontFamily: "Barlow, sans-serif" }}>
        This version is no longer supported. Please update to continue playing.
      </p>
      <button onClick={apply} disabled={updating}
        className="px-6 py-3 rounded-xl font-semibold text-sm disabled:opacity-60 transition-all active:scale-95"
        style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}>
        {updating ? "Updating…" : "Update Now"}
      </button>
    </div>
  );
}
