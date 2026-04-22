import { useProfile } from "../../hooks/useProfile";
import STXAmount from "../ui/STXAmount";
import AnimatedCounter from "../ui/AnimatedCounter";
import ProgressRing from "../ui/ProgressRing";

export default function ProfileStats({ className = "" }) {
  const { stats } = useProfile();
  if (!stats) return null;

  const { wins, losses, winRate, totalGames, totalPayout, totalStaked } = stats;

  return (
    <div className={`panel p-6 ${className}`}>
      <div className="flex items-center gap-6">
        <div className="flex-shrink-0">
          <ProgressRing value={winRate} max={100} size={72} strokeWidth={6}>
            <span className="text-xs font-bold text-gold">{winRate}%</span>
          </ProgressRing>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-4 min-w-0">
          {[
            { label: "Games",    value: <AnimatedCounter value={totalGames} /> },
            { label: "Wins",     value: <AnimatedCounter value={wins} /> },
            { label: "Total won", value: <STXAmount ustx={totalPayout ?? 0} />, accent: true },
            { label: "Wagered",  value: <STXAmount ustx={totalStaked ?? 0} /> },
          ].map(({ label, value, accent }) => (
            <div key={label}>
              <p className={`text-lg font-bold ${accent ? "text-gold" : "text-white"}`} style={{ fontFamily: "Cinzel, serif" }}>
                {value}
              </p>
              <p className="text-xs text-white/30">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
