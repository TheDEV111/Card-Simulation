export default function SpinnerRing({ size = 24, strokeWidth = 3, color = "text-gold", className = "" }) {
  const r = (size - strokeWidth) / 2;
  const circ = 2 * Math.PI * r;

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className={`animate-spin ${color} ${className}`}
      aria-label="Loading"
      role="status"
    >
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} opacity={0.2} />
      <circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="currentColor" strokeWidth={strokeWidth}
        strokeDasharray={`${circ * 0.25} ${circ * 0.75}`}
        strokeLinecap="round"
      />
    </svg>
  );
}
