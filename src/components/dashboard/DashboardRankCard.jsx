import { useProfile } from "../../hooks/useProfile";
import RankBadge from "../ui/RankBadge";
import MiniWinChart from "../ui/MiniWinChart";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function DashboardRankCard() {
  const { rank, stats } = useProfile();

  return (
    <div className="panel p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="label-caps">Your rank</p>
        <Link to={ROUTES.PROFILE} className="text-xs text-gold/70 hover:text-gold transition-colors">
          Profile →
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <RankBadge rank={rank ?? 0} />
        <div className="flex-1 space-y-2">
          <p className="text-sm text-white/50">
            {rank ? `#${rank} on leaderboard` : "Play more to rank up"}
          </p>
          <MiniWinChart games={stats?.recent ?? []} />
        </div>
      </div>
    </div>
  );
}
