import { useBatteryStatus } from "../../hooks/useBatteryStatus.js";

export function LowBatteryWarning() {
  const { supported, isLow, isCritical, level, charging } = useBatteryStatus();

  if (!supported || !isLow || charging) return null;

  const color = isCritical ? "#ef4444" : "#f59e0b";
  const bg = isCritical ? "rgba(239,68,68,0.08)" : "rgba(245,158,11,0.08)";
  const border = isCritical ? "rgba(239,68,68,0.2)" : "rgba(245,158,11,0.2)";

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
      {isCritical
        ? `Battery critical (${level}%) — save your progress`
        : `Battery low (${level}%) — consider charging`}
    </div>
  );
}
