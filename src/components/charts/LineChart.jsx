import { useMemo } from "react";

export default function LineChart({
  data = [],
  valueKey = "value",
  labelKey = "label",
  color = "#34d399",
  height = 80,
  className = "",
}) {
  const values = data.map((d) => d[valueKey] ?? 0);
  const min    = Math.min(...values);
  const max    = Math.max(...values, 1);
  const range  = max - min || 1;
  const w      = 100;
  const h      = height;

  const points = useMemo(() => {
    return values.map((v, i) => {
      const x = (i / Math.max(values.length - 1, 1)) * w;
      const y = h - ((v - min) / range) * (h - 8) - 4;
      return `${x},${y}`;
    }).join(" ");
  }, [values, min, range, w, h]);

  const area = `${points} ${w},${h} 0,${h}`;

  if (values.length < 2) return null;

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <linearGradient id={`lg-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={area} fill={`url(#lg-${color.replace("#", "")})`} />
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
