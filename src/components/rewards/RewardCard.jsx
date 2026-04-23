import PercentBar from "../ui/PercentBar";

export default function RewardCard({ title, description, icon, progress, total, claimed, onClaim }) {
  const pct    = Math.round((progress / Math.max(total, 1)) * 100);
  const done   = progress >= total;
  const locked = !done;

  return (
    <div className={`panel p-4 space-y-3 ${done && !claimed ? "ring-1 ring-gold/30" : ""}`}>
      <div className="flex items-start gap-3">
        <span className={`text-2xl leading-none ${locked ? "grayscale opacity-40" : ""}`}>{icon}</span>
        <div className="flex-1 min-w-0">
          <p className={`text-sm font-semibold ${claimed ? "text-white/40" : "text-white/80"}`}>{title}</p>
          <p className="text-xs text-white/30 mt-0.5">{description}</p>
        </div>
        {done && !claimed && (
          <button
            onClick={onClaim}
            className="flex-shrink-0 text-xs px-3 py-1 rounded-full bg-gold/20 text-gold hover:bg-gold/30 transition-colors"
          >
            Claim
          </button>
        )}
        {claimed && (
          <span className="flex-shrink-0 text-xs px-3 py-1 rounded-full bg-white/5 text-white/30">Claimed</span>
        )}
      </div>
      <div className="space-y-1">
        <PercentBar value={pct} max={100} color={claimed ? "bg-white/15" : done ? "bg-gold" : "bg-win/40"} />
        <p className="text-[10px] text-white/25 text-right">{Math.min(progress, total)} / {total}</p>
      </div>
    </div>
  );
}
