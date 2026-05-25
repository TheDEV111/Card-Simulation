import { useNetworkSpeed } from "../../hooks/useNetworkSpeed.js";

const TYPE_MAP = {
  "4g":      { label: "4G",      color: "#22c55e" },
  "3g":      { label: "3G",      color: "#d4a84b" },
  "2g":      { label: "2G",      color: "#f59e0b" },
  "slow-2g": { label: "EDGE",    color: "#ef4444" },
  "unknown": { label: "?",       color: "rgba(226,226,232,0.3)" },
};

export function NetworkSpeedBadge() {
  const { effectiveType, downlink, supported } = useNetworkSpeed();
  if (!supported) return null;

  const type = TYPE_MAP[effectiveType] ?? TYPE_MAP.unknown;

  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      padding: "2px 7px",
      borderRadius: 10,
      background: `${type.color}12`,
      border: `1px solid ${type.color}30`,
      fontFamily: "Barlow, sans-serif",
      fontSize: 11,
      fontWeight: 700,
      color: type.color,
      letterSpacing: "0.04em",
    }}>
      {type.label}
      {downlink ? ` · ${downlink}Mbps` : ""}
    </span>
  );
}
