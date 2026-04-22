import { useGameHistory } from "../../hooks/useGameHistory";
import GameHistoryRow from "../ui/GameHistoryRow";
import EmptyState from "../ui/EmptyState";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import { SkeletonLine } from "../ui/Skeleton";

const LIMIT = 8;

export default function DashboardRecentGames() {
  const { games, loading } = useGameHistory();
  const recent = games.slice(0, LIMIT);

  return (
    <div className="panel p-6 space-y-4">
      <div className="flex items-center justify-between">
        <p className="label-caps">Recent games</p>
        <Link to={ROUTES.HISTORY} className="text-xs text-gold/70 hover:text-gold transition-colors">
          View all →
        </Link>
      </div>

      {loading ? (
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => <SkeletonLine key={i} />)}
        </div>
      ) : recent.length === 0 ? (
        <EmptyState icon="🃏" title="No games yet" description="Play your first game to see history here." />
      ) : (
        <div className="divide-y divide-white/5">
          {recent.map((game) => (
            <GameHistoryRow key={game.txId} game={game} />
          ))}
        </div>
      )}
    </div>
  );
}
