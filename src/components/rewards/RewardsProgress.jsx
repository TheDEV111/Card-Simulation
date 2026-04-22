import PercentBar from "../ui/PercentBar";

const TIERS = [
  { name: "Bronze",   minGames: 0,   color: "bg-[#cd7f32]", textColor: "text-[#cd7f32]" },
  { name: "Silver",   minGames: 25,  color: "bg-white/60",  textColor: "text-white/60" },
  { name: "Gold",     minGames: 100, color: "bg-gold",      textColor: "text-gold" },
  { name: "Platinum", minGames: 250, color: "bg-[#e5e4e2]", textColor: "text-[#e5e4e2]" },
  { name: "Diamond",  minGames: 500, color: "bg-[#b9f2ff]", textColor: "text-[#b9f2ff]" },
];

export default function RewardsProgress({ games = 0, className = "" }) {
  const currentTier = [...TIERS].reverse().find((t) => games >= t.minGames) ?? TIERS[0];
  const nextTier    = TIERS[TIERS.indexOf(currentTier) + 1];

  const progress = nextTier
    ? Math.round(((games - currentTier.minGames) / (nextTier.minGames - currentTier.minGames)) * 100)
    : 100;

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Tier Progress</h3>
      <div className="flex items-center justify-between gap-3">
        {TIERS.map((t) => (
          <div key={t.name} className="flex flex-col items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${games >= t.minGames ? t.color : "bg-white/10"}`} />
            <span className={`text-[10px] ${games >= t.minGames ? t.textColor : "text-white/20"}`}>{t.name}</span>
          </div>
        ))}
      </div>
      <PercentBar value={progress} max={100} color={currentTier.color} />
      {nextTier && (
        <p className="text-xs text-white/30 text-center">
          {nextTier.minGames - games} games until <span className={nextTier.textColor}>{nextTier.name}</span>
        </p>
      )}
    </div>
  );
}
