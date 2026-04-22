export default function TrendArrow({ value, className = "" }) {
  if (value === 0) {
    return <span className={`text-white/30 text-xs ${className}`}>—</span>;
  }
  const up = value > 0;
  return (
    <span
      className={`text-xs font-medium ${up ? "text-win" : "text-loss"} ${className}`}
      aria-label={up ? "up" : "down"}
    >
      {up ? "▲" : "▼"} {Math.abs(value).toFixed(1)}%
    </span>
  );
}
