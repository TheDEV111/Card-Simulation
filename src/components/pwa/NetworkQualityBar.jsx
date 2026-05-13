const QUALITY_MAP = {
  "4g": { bars: 4, color: "#22c55e", label: "Excellent" },
  "3g": { bars: 3, color: "#f59e0b", label: "Good" },
  "2g": { bars: 2, color: "#f97316", label: "Slow" },
  "slow-2g": { bars: 1, color: "#ef4444", label: "Very Slow" },
};

export function NetworkQualityBar({ effectiveType, downlink, className = "" }) {
  const config = QUALITY_MAP[effectiveType] ?? { bars: 4, color: "#22c55e", label: "Online" };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="flex items-end gap-0.5 h-4">
        {[1, 2, 3, 4].map((level) => (
          <div
            key={level}
            className="w-1 rounded-sm"
            style={{
              height: `${level * 25}%`,
              background: level <= config.bars ? config.color : "rgba(226,226,232,0.1)",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
      <span className="text-xs" style={{ color: config.color, fontFamily: "Barlow, sans-serif" }}>
        {config.label}
        {downlink ? ` · ${downlink} Mbps` : ""}
      </span>
    </div>
  );
}
