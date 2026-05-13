import { useBatteryStatus } from "../../hooks/useBatteryStatus.js";

function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return null;
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export function BatteryStatusCard() {
  const { supported, level, charging, chargingTime, dischargingTime, status } = useBatteryStatus();

  if (!supported) return null;

  const statusColor = {
    charging: "#22c55e", good: "#22c55e",
    medium: "#d4a84b", low: "#f59e0b",
    critical: "#ef4444", unknown: "rgba(226,226,232,0.3)",
  }[status];

  const timeLabel = charging
    ? (formatTime(chargingTime) ? `Full in ${formatTime(chargingTime)}` : null)
    : (formatTime(dischargingTime) ? `${formatTime(dischargingTime)} remaining` : null);

  return (
    <div style={{
      padding: "12px 16px",
      borderRadius: 12,
      background: "rgba(226,226,232,0.03)",
      border: "1px solid rgba(226,226,232,0.06)",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    }}>
      <div>
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, color: "rgba(226,226,232,0.5)", margin: 0 }}>
          Battery
        </p>
        <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 20, fontWeight: 700, color: statusColor, margin: "2px 0 0" }}>
          {level !== null ? `${level}%` : "—"}
        </p>
        {timeLabel && (
          <p style={{ fontFamily: "Barlow, sans-serif", fontSize: 11, color: "rgba(226,226,232,0.35)", margin: "2px 0 0" }}>
            {timeLabel}
          </p>
        )}
      </div>
      <div style={{
        width: 48, height: 22, position: "relative",
        display: "flex", alignItems: "center",
      }}>
        <svg width="44" height="20" viewBox="0 0 44 20" fill="none">
          <rect x="0.5" y="0.5" width="38" height="19" rx="3.5" stroke={statusColor} strokeOpacity={0.3} />
          <rect x="39" y="6" width="4" height="8" rx="1.5" fill={statusColor} fillOpacity={0.3} />
          <rect x="2" y="2" width={`${(level / 100) * 35}`} height="16" rx="2" fill={statusColor} />
        </svg>
      </div>
    </div>
  );
}
