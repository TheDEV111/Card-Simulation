import { usePWADisplay } from "../../hooks/usePWADisplay.js";

export function PWABadge({ className = "" }) {
  const { isStandalone } = usePWADisplay();
  if (!isStandalone) return null;

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${className}`}
      style={{
        background: "rgba(212,168,75,0.08)",
        color: "rgba(212,168,75,0.7)",
        border: "1px solid rgba(212,168,75,0.15)",
        fontFamily: "Barlow, sans-serif",
      }}
    >
      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
      </svg>
      Installed
    </span>
  );
}
