import { useLeaderboard } from "../../hooks/useLeaderboard";
import LeaderboardRow from "../ui/LeaderboardRow";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { SkeletonLine } from "../ui/Skeleton";

export default function DashboardLeaderboardPreview() {
  const { players, loading } = useLeaderboard();
  const top5 = players.slice(0, 5);

  return (
    <div className="panel p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="label-caps">Top players</p>
        <Link to={ROUTES.LEADERBOARD} className="text-xs text-gold/70 hover:text-gold transition-colors">
          Full table →
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <SkeletonLine key={i} />)}
        </div>
      ) : (
        <div className="divide-y divide-white/5">
          {top5.map((player, i) => (
            <LeaderboardRow key={player.address} player={player} rank={i + 1} />
          ))}
        </div>
      )}
    </div>
  );
}
