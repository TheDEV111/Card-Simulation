import { useMemo } from "react";

export default function DonutChart({ segments = [], size = 80, stroke = 12, className = "" }) {
  const total  = segments.reduce((s, seg) => s + seg.value, 0) || 1;
  const r      = (size - stroke) / 2;
  const circ   = 2 * Math.PI * r;
  const cx     = size / 2;
  const cy     = size / 2;

  const arcs = useMemo(() => {
    let offset = 0;
    return segments.map((seg) => {
      const pct    = seg.value / total;
      const dash   = pct * circ;
      const gap    = circ - dash;
      const result = { ...seg, dash, gap, offset };
      offset += dash;
      return result;
    });
  }, [segments, total, circ]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={className}
      role="img"
      aria-label="Donut chart"
    >
      {arcs.map((arc, i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={arc.color ?? "#d4af37"}
          strokeWidth={stroke}
          strokeDasharray={`${arc.dash} ${arc.gap}`}
          strokeDashoffset={-arc.offset}
          strokeLinecap="butt"
          style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
        />
      ))}
    </svg>
  );
}
