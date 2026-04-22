import AnimatedCounter from "./AnimatedCounter";
import TrendArrow from "./TrendArrow";

export default function MotionValue({ label, value, prev, decimals = 0, prefix = "", suffix = "", className = "" }) {
  const trend = prev != null && prev !== 0 ? ((value - prev) / Math.abs(prev)) * 100 : null;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && <p className="text-xs text-white/40">{label}</p>}
      <div className="flex items-baseline gap-2">
        <span className="text-2xl font-bold text-white tabular-nums" style={{ fontFamily: "Cinzel, serif" }}>
          {prefix}<AnimatedCounter value={value} decimals={decimals} />{suffix}
        </span>
        {trend != null && <TrendArrow value={trend} />}
      </div>
    </div>
  );
}
