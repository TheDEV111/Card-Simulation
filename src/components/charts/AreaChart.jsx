import { useMemo } from "react";

export default function AreaChart({
  data = [],
  keys = [],
  colors = [],
  height = 100,
  className = "",
}) {
  const w = 100;
  const h = height;

  const allValues = data.flatMap((d) => keys.map((k) => d[k] ?? 0));
  const max = Math.max(...allValues, 1);

  const paths = useMemo(() =>
    keys.map((key, ki) => {
      const pts = data.map((d, i) => {
        const x = (i / Math.max(data.length - 1, 1)) * w;
        const y = h - ((d[key] ?? 0) / max) * (h - 8) - 4;
        return `${x},${y}`;
      });
      const line = pts.join(" ");
      const area = `${line} ${w},${h} 0,${h}`;
      return { key, line, area, color: colors[ki] ?? "#d4af37" };
    }),
  [data, keys, colors, max, w, h]);

  if (data.length < 2) return null;

  return (
    <div className={`w-full ${className}`} style={{ height }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" className="w-full h-full">
        <defs>
          {paths.map((p) => (
            <linearGradient key={p.key} id={`ag-${p.key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={p.color} stopOpacity="0.25" />
              <stop offset="100%" stopColor={p.color} stopOpacity="0.02" />
            </linearGradient>
          ))}
        </defs>
        {paths.map((p) => (
          <g key={p.key}>
            <polygon points={p.area} fill={`url(#ag-${p.key})`} />
            <polyline
              points={p.line}
              fill="none"
              stroke={p.color}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
