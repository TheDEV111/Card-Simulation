import { useEffect, useState } from "react";
import { useSWUpdate } from "../../hooks/useSWUpdate.js";

export function UpdateToast() {
  const { updateAvailable, apply, dismiss } = useSWUpdate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (updateAvailable) {
      const t = setTimeout(() => setVisible(true), 1000);
      return () => clearTimeout(t);
    } else {
      setVisible(false);
    }
  }, [updateAvailable]);

  if (!visible) return null;

  return (
    <div
      className="fixed bottom-4 left-4 z-50 flex items-center gap-3 px-4 py-3 rounded-xl shadow-2xl"
      style={{
        background: "#1e1e2a",
        border: "1px solid rgba(212,168,75,0.25)",
        maxWidth: "320px",
        animation: "slideUp 0.2s ease-out",
      }}
    >
      <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        style={{ color: "#d4a84b" }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      <div className="flex-1">
        <p className="text-xs font-semibold" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>Update ready</p>
        <p className="text-xs" style={{ color: "rgba(226,226,232,0.45)" }}>Reload to get the latest version</p>
      </div>
      <button onClick={apply} className="text-xs font-semibold shrink-0"
        style={{ color: "#d4a84b", fontFamily: "Barlow, sans-serif" }}>Reload</button>
      <button onClick={dismiss} className="text-xs opacity-40 hover:opacity-70"
        style={{ color: "#e2e2e8" }}>✕</button>
    </div>
  );
}
