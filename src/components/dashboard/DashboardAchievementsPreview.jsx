import { useRewards } from "../../hooks/useRewards";
import AchievementCard from "../ui/AchievementCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function DashboardAchievementsPreview() {
  const { achievements } = useRewards();
  const recent = achievements.slice(0, 3);

  const earned = achievements.filter((a) => a.earned).length;

  return (
    <div className="panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="label-caps">Achievements</p>
          <p className="text-xs text-white/40 mt-0.5">{earned} / {achievements.length} earned</p>
        </div>
        <Link to={ROUTES.REWARDS} className="text-xs text-gold/70 hover:text-gold transition-colors">
          View all →
        </Link>
      </div>
      <div className="space-y-2">
        {recent.map((a) => (
          <AchievementCard key={a.id} achievement={a} compact />
        ))}
      </div>
    </div>
  );
}
