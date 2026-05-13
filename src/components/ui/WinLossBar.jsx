export default function WinLossBar({ wins, losses, className = "" }) {
  const total = wins + losses;
  if (total === 0) return null;

  const winPct = (wins / total) * 100;

  return (
    <div className={`space-y-1 ${className}`}>
      <div className="flex justify-between text-xs text-white/40">
        <span>{wins}W</span>
        <span>{losses}L</span>
      </div>
      <div className="h-1.5 rounded-full bg-surface-overlay overflow-hidden">
        <div
          className="h-full rounded-full bg-win transition-all duration-500"
          style={{ width: `${winPct}%` }}
        />
      </div>
    </div>
  );
}
