import { useWakeLock } from "../../hooks/useWakeLock.js";

export function WakeLockToggle({ className = "" }) {
  const { active, supported, acquire, release } = useWakeLock();

  if (!supported) return null;

  return (
    <button
      onClick={active ? release : acquire}
      className={className}
      title={active ? "Screen stay-awake active — click to disable" : "Keep screen awake while playing"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: "6px 12px",
        borderRadius: 20,
        border: active ? "1px solid rgba(212,168,75,0.35)" : "1px solid rgba(226,226,232,0.1)",
        background: active ? "rgba(212,168,75,0.1)" : "rgba(226,226,232,0.04)",
        color: active ? "#d4a84b" : "rgba(226,226,232,0.4)",
        fontFamily: "Barlow, sans-serif",
        fontSize: 12,
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <svg width="12" height="12" viewBox="0 0 24 24" fill={active ? "#d4a84b" : "none"}
        stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
      </svg>
      {active ? "Awake" : "Stay Awake"}
    </button>
  );
}
