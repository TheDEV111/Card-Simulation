import { usePWAReady } from "../../hooks/usePWAReady.js";

export function OfflineReadyBadge() {
  const { swActive } = usePWAReady();

  if (!swActive) return null;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 5,
      padding: "3px 9px",
      borderRadius: 12,
      background: "rgba(34,197,94,0.07)",
      border: "1px solid rgba(34,197,94,0.18)",
      fontFamily: "Barlow, sans-serif",
      fontSize: 11,
      fontWeight: 600,
      color: "#22c55e",
    }}>
      <span style={{
        width: 5, height: 5, borderRadius: "50%",
        background: "#22c55e", boxShadow: "0 0 4px #22c55e",
      }} />
      Offline Ready
    </span>
  );
}
