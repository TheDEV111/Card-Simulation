export default function WinRateDonut({ winRate, size = 80 }) {
  const r = 30;
  const circumference = 2 * Math.PI * r;
  const fill = (winRate / 100) * circumference;
  const cx = size / 2;

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={cx} cy={cx} r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
        <circle
          cx={cx} cy={cx} r={r}
          fill="none"
          stroke="#d4a84b"
          strokeWidth="6"
          strokeDasharray={`${fill} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.8s cubic-bezier(0.16,1,0.3,1)" }}
        />
      </svg>
      <span className="absolute text-sm font-bold text-gold" style={{ fontFamily: "Cinzel, serif" }}>
        {winRate}%
      </span>
    </div>
  );
}
