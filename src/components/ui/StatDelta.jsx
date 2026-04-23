export default function StatDelta({ value, suffix = "", className = "" }) {
  const isPositive = value >= 0;
  const isZero     = value === 0;

  return (
    <span
      className={`text-xs font-semibold tabular-nums ${
        isZero      ? "text-white/30" :
        isPositive  ? "text-win" :
                      "text-loss"
      } ${className}`}
    >
      {!isZero && (isPositive ? "▲" : "▼")}
      {Math.abs(value)}{suffix}
    </span>
  );
}
