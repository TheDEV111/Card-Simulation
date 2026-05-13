import { useEffect, useState } from "react";

export function OfflineBanner({ show, onDismiss }) {
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (show) {
      setVisible(true);
      requestAnimationFrame(() => setAnimating(true));
    } else {
      setAnimating(false);
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (!visible) return null;

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4 py-3 transition-transform duration-300"
      style={{
        background: "#1e1e2a",
        borderBottom: "1px solid rgba(212,168,75,0.2)",
        transform: animating ? "translateY(0)" : "translateY(-100%)",
      }}
    >
      <div className="flex items-center gap-3">
        <span
          className="w-2 h-2 rounded-full"
          style={{ background: "#ef4444", boxShadow: "0 0 6px #ef4444" }}
        />
        <span className="text-sm font-medium" style={{ color: "#e2e2e8", fontFamily: "Barlow, sans-serif" }}>
          You're offline — some features may be unavailable
        </span>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="ml-4 text-xs opacity-50 hover:opacity-100 transition-opacity"
          style={{ color: "#d4a84b" }}
          aria-label="Dismiss offline notice"
        >
          ✕
        </button>
      )}
    </div>
  );
}
