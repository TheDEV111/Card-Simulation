import { useBatteryStatus } from "../../hooks/useBatteryStatus.js";

const STATUS_COLOR = {
  charging: "#22c55e",
  good: "#22c55e",
  medium: "#d4a84b",
  low: "#f59e0b",
  critical: "#ef4444",
  unknown: "rgba(226,226,232,0.3)",
};

export function BatteryIndicator({ showLabel = true }) {
  const { supported, level, charging, status } = useBatteryStatus();

  if (!supported || level === null) return null;

  const color = STATUS_COLOR[status];
  const fillWidth = `${level}%`;

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
      <div style={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
        <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
          <rect x="0.5" y="0.5" width="24" height="13" rx="2.5" stroke={color} strokeOpacity={0.4} />
          <rect x="25" y="4" width="2.5" height="6" rx="1" fill={color} fillOpacity={0.4} />
          <rect x="1.5" y="1.5" width={`${(level / 100) * 22}`} height="11" rx="1.5" fill={color} />
        </svg>
        {charging && (
          <svg width="8" height="8" viewBox="0 0 24 24" fill="#22c55e"
            style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%,-50%)" }}>
            <path d="M11.7 2.805a.75.75 0 01.658.743v7.5h3.22a.75.75 0 01.592 1.206l-6.5 8.25a.75.75 0 01-1.32-.518v-7.5h-3.22a.75.75 0 01-.592-1.206l6.5-8.25a.75.75 0 01.662-.225z" />
          </svg>
        )}
      </div>
      {showLabel && (
        <span style={{
          fontFamily: "Barlow, sans-serif",
          fontSize: 11,
          color,
          fontWeight: 600,
        }}>
          {level}%
        </span>
      )}
    </div>
  );
}
