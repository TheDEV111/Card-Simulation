export default function PulseRing({ color = "gold", size = 8, className = "" }) {
  const colors = {
    gold:    "bg-gold",
    win:     "bg-win",
    loss:    "bg-loss",
    white:   "bg-white",
  };
  const sz = `h-${size} w-${size}`;

  return (
    <span className={`relative flex ${sz} ${className}`}>
      <span
        className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-40 ${colors[color] ?? colors.gold}`}
      />
      <span className={`relative inline-flex rounded-full ${sz} ${colors[color] ?? colors.gold}`} />
    </span>
  );
}
