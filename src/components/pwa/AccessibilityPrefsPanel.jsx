import { usePWATheme } from "../../hooks/usePWATheme.js";

function PrefRow({ label, active, activeLabel, inactiveLabel }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "8px 0",
    }}>
      <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, color: "rgba(226,226,232,0.6)" }}>
        {label}
      </span>
      <span style={{
        fontFamily: "Barlow, sans-serif",
        fontSize: 11,
        fontWeight: 600,
        color: active ? "#d4a84b" : "rgba(226,226,232,0.3)",
        padding: "2px 8px",
        borderRadius: 8,
        background: active ? "rgba(212,168,75,0.08)" : "rgba(226,226,232,0.04)",
        border: `1px solid ${active ? "rgba(212,168,75,0.2)" : "rgba(226,226,232,0.06)"}`,
      }}>
        {active ? activeLabel : inactiveLabel}
      </span>
    </div>
  );
}

export function AccessibilityPrefsPanel() {
  const { prefersDark, prefersReducedMotion, prefersHighContrast } = usePWATheme();

  return (
    <div>
      <p style={{
        fontFamily: "Cinzel, serif",
        fontSize: 11,
        color: "#d4a84b",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        margin: "0 0 4px",
      }}>
        System Preferences
      </p>
      <div style={{ borderTop: "1px solid rgba(226,226,232,0.06)", paddingTop: 4 }}>
        <PrefRow label="Color Scheme" active={prefersDark} activeLabel="Dark" inactiveLabel="Light" />
        <PrefRow label="Motion" active={prefersReducedMotion} activeLabel="Reduced" inactiveLabel="Full" />
        <PrefRow label="Contrast" active={prefersHighContrast} activeLabel="High" inactiveLabel="Standard" />
      </div>
    </div>
  );
}
