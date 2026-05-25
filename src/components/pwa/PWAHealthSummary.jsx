import { usePWADiagnostics } from "../../hooks/usePWADiagnostics.js";

export function PWAHealthSummary() {
  const { score, loading } = usePWADiagnostics();

  const color = score >= 80 ? "#22c55e" : score >= 50 ? "#d4a84b" : "#ef4444";
  const label = score >= 80 ? "Excellent" : score >= 50 ? "Partial" : "Limited";

  return (
    <div style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 10,
      padding: "8px 14px",
      borderRadius: 12,
      background: `${color}08`,
      border: `1px solid ${color}25`,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: "50%",
        background: `${color}12`,
        border: `2px solid ${color}40`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Barlow, sans-serif",
        fontSize: 11,
        fontWeight: 700,
        color,
      }}>
        {loading ? "…" : score}
      </div>
      <div>
        <p style={{ fontFamily: "Cinzel, serif", fontSize: 12, color, margin: 0, fontWeight: 700 }}>
          {loading ? "Checking…" : label}
        </p>
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 11, color: "rgba(226,226,232,0.35)", margin: "1px 0 0" }}>
          PWA Health Score
        </p>
      </div>
    </div>
  );
}
