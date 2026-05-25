import { useStorageQuota } from "../../hooks/useStorageQuota.js";

export function StorageCriticalAlert() {
  const { isCritical, isWarning, estimate } = useStorageQuota();

  if (!isCritical && !isWarning) return null;

  const color = isCritical ? "#ef4444" : "#f59e0b";
  const bg = isCritical ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)";
  const border = isCritical ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)";
  const msg = isCritical
    ? `Storage almost full (${estimate?.percent}%) — clear caches to continue`
    : `Storage at ${estimate?.percent}% — consider clearing old caches`;

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      padding: "8px 12px",
      borderRadius: 10,
      background: bg,
      border: `1px solid ${border}`,
      fontFamily: "Barlow, sans-serif",
      fontSize: 12,
      color,
    }}>
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: color, boxShadow: `0 0 6px ${color}`, flexShrink: 0,
      }} />
      {msg}
    </div>
  );
}
