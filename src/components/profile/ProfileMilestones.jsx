import { useProfile } from "../../hooks/useProfile";
import PercentBar from "../ui/PercentBar";

const MILESTONES = [
  { label: "10 Games",   target: 10,   key: "totalGames" },
  { label: "50 Games",   target: 50,   key: "totalGames" },
  { label: "100 Games",  target: 100,  key: "totalGames" },
  { label: "500 Games",  target: 500,  key: "totalGames" },
  { label: "50% Win Rate (20+ games)", target: 50, key: "winRate", minGames: 20 },
];

export default function ProfileMilestones({ className = "" }) {
  const { stats } = useProfile();

  if (!stats) return null;

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Milestones</h3>
      <div className="space-y-3">
        {MILESTONES.map((m) => {
          const current = stats[m.key] ?? 0;
          const meetsMin = !m.minGames || stats.totalGames >= m.minGames;
          const progress = meetsMin ? Math.min(100, Math.round((current / m.target) * 100)) : 0;
          const done = meetsMin && current >= m.target;

          return (
            <div key={m.label} className="space-y-1">
              <div className="flex items-center justify-between">
                <span className={`text-xs ${done ? "text-gold" : "text-white/50"}`}>{m.label}</span>
                <span className="text-[10px] text-white/30">
                  {done ? "✓ Complete" : `${Math.min(current, m.target)} / ${m.target}`}
                </span>
              </div>
              <PercentBar
                value={progress}
                max={100}
                color={done ? "bg-gold" : "bg-white/20"}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
