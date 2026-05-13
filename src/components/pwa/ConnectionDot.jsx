import { useOnlineStatus } from "../../hooks/useOnlineStatus.js";

const QUALITY_CONFIG = {
  online: { color: "#22c55e", glow: "#22c55e", label: "Connected" },
  slow: { color: "#f59e0b", glow: "#f59e0b", label: "Slow" },
  offline: { color: "#ef4444", glow: "#ef4444", label: "Offline" },
};

export function ConnectionDot({ showLabel = false, className = "" }) {
  const { isOnline, isOffline, verified } = useOnlineStatus();

  const status = isOffline ? "offline" : verified === null ? "online" : "online";
  const cfg = QUALITY_CONFIG[status];

  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span className="relative flex w-2 h-2">
        {isOnline && (
          <span
            className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
            style={{ background: cfg.color }}
          />
        )}
        <span
          className="relative inline-flex rounded-full w-2 h-2"
          style={{ background: cfg.color, boxShadow: `0 0 6px ${cfg.glow}` }}
        />
      </span>
      {showLabel && (
        <span className="text-xs" style={{ color: cfg.color, fontFamily: "Barlow, sans-serif" }}>
          {cfg.label}
        </span>
      )}
    </span>
  );
}
