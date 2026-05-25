import { useStorageQuota } from "../../hooks/useStorageQuota.js";

export function PersistStoragePrompt() {
  const { persistent, requestPersist } = useStorageQuota();

  if (persistent) return null;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 12,
      padding: "12px 16px",
      borderRadius: 12,
      background: "rgba(212,168,75,0.05)",
      border: "1px solid rgba(212,168,75,0.15)",
    }}>
      <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#d4a84b" strokeWidth={1.5} style={{ flexShrink: 0 }}>
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 6c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
      </svg>
      <div style={{ flex: 1 }}>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: 12, fontWeight: 700, color: "#d4a84b", margin: 0 }}>
          Protect Your Data
        </p>
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 11, color: "rgba(226,226,232,0.4)", margin: "2px 0 0" }}>
          Enable persistent storage so your game data isn't cleared automatically.
        </p>
      </div>
      <button
        onClick={requestPersist}
        style={{
          background: "#d4a84b",
          color: "#0f0f14",
          fontFamily: "Barlow, sans-serif",
          fontSize: 11,
          fontWeight: 700,
          border: "none",
          borderRadius: 8,
          padding: "6px 12px",
          cursor: "pointer",
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        Enable
      </button>
    </div>
  );
}
