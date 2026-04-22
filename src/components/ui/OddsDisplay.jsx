export default function OddsDisplay({ wins, losses }) {
  const total = wins + losses;
  const winPct  = total ? Math.round((wins / total) * 100) : 0;
  const lossPct = 100 - winPct;

  return (
    <div className="space-y-1.5">
      <div className="flex text-2xs justify-between text-white/40">
        <span>Wins {winPct}%</span>
        <span>Losses {lossPct}%</span>
      </div>
      <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
        <div className="bg-win rounded-l-full transition-all duration-700" style={{ width: `${winPct}%` }} />
        <div className="bg-loss rounded-r-full transition-all duration-700" style={{ width: `${lossPct}%` }} />
      </div>
    </div>
  );
}
