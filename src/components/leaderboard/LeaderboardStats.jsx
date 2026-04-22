import { useGlobalStats } from "../../hooks/useGlobalStats";
import STXAmount from "../ui/STXAmount";
import AnimatedCounter from "../ui/AnimatedCounter";

export default function LeaderboardStats({ className = "" }) {
  const { totalGames, players, volume, biggestWin, winRate } = useGlobalStats();

  const stats = [
    { label: "Total games",   value: <AnimatedCounter value={totalGames} />, },
    { label: "Players",       value: <AnimatedCounter value={players} />, },
    { label: "Volume",        value: <><STXAmount ustx={volume} /></>, },
    { label: "Biggest win",   value: <><STXAmount ustx={biggestWin} /></>, accent: true },
    { label: "House win rate", value: `${winRate}%` },
  ];

  return (
    <div className={`grid grid-cols-2 sm:grid-cols-5 gap-3 ${className}`}>
      {stats.map(({ label, value, accent }) => (
        <div key={label} className="panel p-4 text-center">
          <p className={`text-sm font-bold ${accent ? "text-gold" : "text-white"}`} style={{ fontFamily: "Cinzel, serif" }}>
            {value}
          </p>
          <p className="text-[10px] text-white/30 uppercase tracking-wider mt-1">{label}</p>
        </div>
      ))}
    </div>
  );
}
