import { useStorageEstimate } from "../../hooks/useStorageEstimate.js";

export function StorageUsageBar({ className = "" }) {
  const { usageFormatted, quotaFormatted, usagePercent, loading } = useStorageEstimate();

  if (loading) return null;

  const pct = Math.min(usagePercent, 100);
  const color = pct > 90 ? "#ef4444" : pct > 70 ? "#f59e0b" : "#22c55e";

  return (
    <div className={`space-y-1.5 ${className}`}>
      <div className="flex justify-between text-xs"
        style={{ color: "rgba(226,226,232,0.45)", fontFamily: "Barlow, sans-serif" }}>
        <span>Storage used</span>
        <span className="tabular-nums">{usageFormatted} / {quotaFormatted}</span>
      </div>
      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(226,226,232,0.08)" }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      {pct > 80 && (
        <p className="text-xs" style={{ color, fontFamily: "Barlow, sans-serif" }}>
          Storage {pct > 90 ? "critically" : "nearly"} full — consider clearing cache
        </p>
      )}
    </div>
  );
}
