import { usePWAReady } from "../../hooks/usePWAReady.js";
import { usePWADisplay } from "../../hooks/usePWADisplay.js";
import { PWA_CONFIG } from "../../pwa/config.js";

export function PWAInfoCard() {
  const { ready, swActive } = usePWAReady();
  const { displayMode } = usePWADisplay();

  return (
    <div style={{
      padding: "14px 16px",
      borderRadius: 12,
      background: "rgba(226,226,232,0.02)",
      border: "1px solid rgba(226,226,232,0.05)",
      fontFamily: "Barlow, sans-serif",
      fontSize: 12,
    }}>
      <p style={{ fontFamily: "Cinzel, serif", fontSize: 11, color: "#d4a84b", margin: "0 0 10px", letterSpacing: "0.06em", textTransform: "uppercase" }}>
        App Info
      </p>
      {[
        ["Version", PWA_CONFIG.VERSION],
        ["Display", displayMode],
        ["SW Status", !ready ? "Loading…" : swActive ? "Active" : "Inactive"],
        ["Cache", PWA_CONFIG.CACHE_NAMES.STATIC],
      ].map(([label, value]) => (
        <div key={label} style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 0",
          borderBottom: "1px solid rgba(226,226,232,0.04)",
        }}>
          <span style={{ color: "rgba(226,226,232,0.4)" }}>{label}</span>
          <span style={{ color: "rgba(226,226,232,0.7)", fontWeight: 500 }}>{value}</span>
        </div>
      ))}
    </div>
  );
}
