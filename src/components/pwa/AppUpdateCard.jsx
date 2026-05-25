import { useSWUpdate } from "../../hooks/useSWUpdate.js";

export function AppUpdateCard() {
  const { updateAvailable, apply } = useSWUpdate();

  if (!updateAvailable) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, rgba(212,168,75,0.09) 0%, rgba(212,168,75,0.03) 100%)",
        border: "1px solid rgba(212,168,75,0.25)",
        borderRadius: 16,
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          background: "rgba(212,168,75,0.1)",
          border: "1px solid rgba(212,168,75,0.2)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#d4a84b" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
        </svg>
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontFamily: "Cinzel, serif",
          fontSize: 13,
          fontWeight: 700,
          color: "#d4a84b",
          margin: 0,
        }}>
          Update Available
        </p>
        <p style={{
          fontFamily: "Barlow, sans-serif",
          fontSize: 12,
          color: "rgba(226,226,232,0.45)",
          margin: "3px 0 0",
          lineHeight: 1.4,
        }}>
          A new version is ready. Reload to apply.
        </p>
      </div>
      <button
        onClick={apply}
        style={{
          background: "#d4a84b",
          color: "#0f0f14",
          fontFamily: "Barlow, sans-serif",
          fontSize: 12,
          fontWeight: 700,
          border: "none",
          borderRadius: 8,
          padding: "7px 14px",
          cursor: "pointer",
          flexShrink: 0,
          transition: "opacity 0.15s",
        }}
        onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
        onMouseLeave={(e) => (e.target.style.opacity = "1")}
      >
        Reload
      </button>
    </div>
  );
}
