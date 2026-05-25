import { useStorageQuota } from "../../hooks/useStorageQuota.js";
import { formatStorageBytes } from "../../pwa/storage-estimate.js";

export function StorageQuotaBar({ showDetails = true }) {
  const { estimate, level, loading } = useStorageQuota();

  if (loading || !estimate) return null;

  const barColor = level === "critical" ? "#ef4444" : level === "warning" ? "#f59e0b" : "#22c55e";

  return (
    <div>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline",
        marginBottom: 6,
      }}>
        <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 12, color: "rgba(226,226,232,0.5)" }}>
          Storage
        </span>
        {showDetails && (
          <span style={{ fontFamily: "Barlow, sans-serif", fontSize: 11, color: "rgba(226,226,232,0.35)" }}>
            {formatStorageBytes(estimate.usage)} / {formatStorageBytes(estimate.quota)}
          </span>
        )}
      </div>
      <div style={{
        width: "100%",
        height: 4,
        borderRadius: 2,
        background: "rgba(226,226,232,0.06)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${estimate.percent}%`,
          borderRadius: 2,
          background: barColor,
          transition: "width 0.4s ease, background 0.3s ease",
          boxShadow: `0 0 6px ${barColor}40`,
        }} />
      </div>
      {showDetails && (
        <p style={{
          fontFamily: "Barlow, sans-serif",
          fontSize: 11,
          color: "rgba(226,226,232,0.25)",
          margin: "4px 0 0",
        }}>
          {estimate.percent}% used · {formatStorageBytes(estimate.free)} free
        </p>
      )}
    </div>
  );
}
