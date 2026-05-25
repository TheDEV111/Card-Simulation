import { usePWAInstall } from "../../hooks/usePWAInstall.js";
import { usePWADisplay } from "../../hooks/usePWADisplay.js";

export function InstallCard() {
  const { canInstall, installed, install, isIOS } = usePWAInstall();
  const { isStandalone } = usePWADisplay();

  if (isStandalone || (installed && !isIOS)) return null;

  return (
    <div
      className="rounded-2xl p-5 flex items-center gap-5"
      style={{
        background: "linear-gradient(135deg, rgba(212,168,75,0.06) 0%, rgba(212,168,75,0.02) 100%)",
        border: "1px solid rgba(212,168,75,0.2)",
      }}
    >
      <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0"
        style={{ background: "rgba(212,168,75,0.08)", border: "1px solid rgba(212,168,75,0.15)" }}>
        <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}
          style={{ color: "#d4a84b" }}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-bold text-sm" style={{ fontFamily: "Cinzel, serif", color: "#d4a84b" }}>
          Play on Your Home Screen
        </p>
        <p className="text-xs mt-1 leading-relaxed"
          style={{ color: "rgba(226,226,232,0.45)", fontFamily: "Barlow, sans-serif" }}>
          {isIOS ? "Open in Safari and tap Share → Add to Home Screen" : "Instant access, offline support, no app store"}
        </p>
        {canInstall && (
          <button
            onClick={install}
            className="mt-3 px-4 py-1.5 rounded-lg text-xs font-semibold transition-all active:scale-95"
            style={{ background: "#d4a84b", color: "#0f0f14", fontFamily: "Barlow, sans-serif" }}
          >
            Add to Home Screen
          </button>
        )}
      </div>
    </div>
  );
}
