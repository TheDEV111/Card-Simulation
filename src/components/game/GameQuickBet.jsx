import { useGameStats } from "../../hooks/useGameStats";
import STXAmount from "../ui/STXAmount";

const MULTIPLIERS = [0.5, 1, 2, 5];

export default function GameQuickBet({ currentStake, onChange, className = "" }) {
  const { avgStake } = useGameStats();
  const base = avgStake ?? 50_000;

  return (
    <div className={`space-y-2 ${className}`}>
      <p className="text-xs text-white/30">Quick bet</p>
      <div className="grid grid-cols-4 gap-1.5">
        {MULTIPLIERS.map((m) => {
          const amount = Math.round(base * m);
          const active = currentStake === amount;
          return (
            <button
              key={m}
              onClick={() => onChange(amount)}
              className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                active
                  ? "bg-gold text-black"
                  : "bg-white/6 text-white/50 hover:bg-white/10"
              }`}
              aria-pressed={active}
            >
              {m === 1 ? "Avg" : `${m}×`}
            </button>
          );
        })}
      </div>
      <p className="text-[10px] text-white/20 text-center">
        Based on your avg: <STXAmount ustx={base} />
      </p>
    </div>
  );
}
