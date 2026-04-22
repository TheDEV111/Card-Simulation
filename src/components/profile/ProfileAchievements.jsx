import { useProfile } from "../../hooks/useProfile";
import AchievementCard from "../ui/AchievementCard";
import PercentBar from "../ui/PercentBar";

export default function ProfileAchievements({ className = "" }) {
  const { achievements } = useProfile();
  if (!achievements?.length) return null;

  const earned = achievements.filter((a) => a.earned).length;
  const total  = achievements.length;

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Achievements</h3>
        <span className="text-xs text-white/30">{earned}/{total}</span>
      </div>
      <PercentBar value={earned} max={total} />
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {achievements.map((a) => (
          <AchievementCard key={a.id ?? a.title} achievement={a} />
        ))}
      </div>
    </div>
  );
}
