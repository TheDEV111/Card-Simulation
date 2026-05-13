import { usePWAInstall } from "../../hooks/usePWAInstall.js";

export function InstallBanner() {
  const { showBanner, install, dismiss } = usePWAInstall();

  if (!showBanner) return null;

  return (
    <div
      className="fixed bottom-0 inset-x-0 z-40 px-4 py-4 safe-area-inset-bottom"
      style={{
        background: "linear-gradient(to top, #0f0f14 80%, transparent)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div
        className="max-w-sm mx-auto rounded-2xl p-4 flex items-center gap-4"
        style={{
          background: "#1e1e2a",
          border: "1px solid rgba(212,168,75,0.25)",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,168,75,0.05)",
        }}
      >
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(212,168,75,0.1)", border: "1px solid rgba(212,168,75,0.2)" }}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
            style={{ color: "#d4a84b" }}>
            <path strokeLinecap="round" strokeLinejoin="round"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold" style={{ color: "#e2e2e8", fontFamily: "Cinzel, serif" }}>
            Add to Home Screen
          </p>
          <p className="text-xs mt-0.5" style={{ color: "rgba(226,226,232,0.45)", fontFamily: "Barlow, sans-serif" }}>
            Play offline, faster load times
          </p>
        </div>
        <div className="flex flex-col gap-1.5 shrink-0">
          <button
            onClick={install}
            className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 active:scale-95"
            style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
          >
            Install
          </button>
          <button
            onClick={dismiss}
            className="px-3 py-1.5 rounded-lg text-xs transition-colors"
            style={{ color: "rgba(226,226,232,0.35)", fontFamily: "Barlow, sans-serif" }}
          >
            Not now
          </button>
        </div>
      </div>
    </div>
  );
}
