import { useWinStreak } from "../../hooks/useWinStreak";
import AnimatedCounter from "../ui/AnimatedCounter";
import PulseRing from "../ui/PulseRing";

const STREAK_TIERS = [
  { streak: 3, multiplier: "1.1×", label: "Hot" },
  { streak: 5, multiplier: "1.25×", label: "Blazing" },
  { streak: 7, multiplier: "1.5×", label: "Unstoppable" },
  { streak: 10, multiplier: "2×", label: "Legendary" },
];

export default function RewardsStreakBonus({ className = "" }) {
  const { current, best } = useWinStreak();

  const active = [...STREAK_TIERS].reverse().find((t) => current >= t.streak);

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Streak Multiplier</h3>

      <div className="flex items-center gap-4">
        <div className="relative">
          {active && <PulseRing color="bg-win/30" size="full" />}
          <div className="relative w-14 h-14 rounded-full bg-white/5 flex flex-col items-center justify-center">
            <AnimatedCounter value={current} className="text-xl font-bold text-win" style={{ fontFamily: "Cinzel, serif" }} />
            <span className="text-[9px] text-white/30 uppercase">streak</span>
          </div>
        </div>
        <div>
          {active ? (
            <>
              <p className="text-sm font-bold text-win">{active.label}!</p>
              <p className="text-xs text-white/50">Payout multiplier: <span className="text-gold font-semibold">{active.multiplier}</span></p>
            </>
          ) : (
            <p className="text-xs text-white/40">Win 3 in a row to activate a streak multiplier.</p>
          )}
          <p className="text-xs text-white/25 mt-1">Best streak: {best}</p>
        </div>
      </div>

      <div className="flex gap-2">
        {STREAK_TIERS.map((t) => (
          <div
            key={t.streak}
            className={`flex-1 rounded-lg p-2 text-center border transition-colors ${
              current >= t.streak
                ? "border-win/30 bg-win/10"
                : "border-white/8 bg-white/3"
            }`}
          >
            <p className={`text-xs font-bold ${current >= t.streak ? "text-gold" : "text-white/20"}`}>{t.multiplier}</p>
            <p className={`text-[9px] mt-0.5 ${current >= t.streak ? "text-white/50" : "text-white/15"}`}>×{t.streak}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
