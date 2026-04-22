export default function DotIndicator({ status = "neutral", pulse = false, className = "" }) {
  const colors = {
    live:    "bg-win",
    win:     "bg-win",
    loss:    "bg-loss",
    pending: "bg-gold",
    neutral: "bg-white/20",
  };

  return (
    <span className={`relative inline-flex h-2 w-2 ${className}`}>
      {pulse && (
        <span
          className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${colors[status] ?? colors.neutral}`}
        />
      )}
      <span className={`relative inline-flex rounded-full h-2 w-2 ${colors[status] ?? colors.neutral}`} />
    </span>
  );
}
