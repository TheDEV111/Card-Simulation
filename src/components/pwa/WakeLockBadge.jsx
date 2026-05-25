import { useWakeLock } from "../../hooks/useWakeLock.js";

export function WakeLockBadge() {
  const { active, supported } = useWakeLock();

  if (!supported || !active) return null;

  return (
    <span
      title="Screen Wake Lock is active"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        padding: "2px 8px",
        borderRadius: 12,
        background: "rgba(212,168,75,0.08)",
        border: "1px solid rgba(212,168,75,0.2)",
        color: "#d4a84b",
        fontFamily: "Barlow, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        letterSpacing: "0.03em",
      }}
    >
      <svg width="9" height="9" viewBox="0 0 24 24" fill="#d4a84b">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0z" />
      </svg>
      Awake
    </span>
  );
}
