import { Link } from "react-router-dom";
import GameHistoryRow from "./GameHistoryRow";
import EmptyState from "./EmptyState";
import SectionHeading from "./SectionHeading";
import { ROUTES } from "../../utils/routes";

export default function RecentGames({ games = [] }) {
  return (
    <div className="space-y-3">
      <SectionHeading
        title="Recent games"
        action={
          games.length > 0 && (
            <Link to={ROUTES.HISTORY} className="text-xs text-gold/70 hover:text-gold transition-colors">
              View all →
            </Link>
          )
        }
      />
      <div className="panel overflow-hidden">
        {games.length === 0 ? (
          <EmptyState
            icon="🃏"
            title="No games yet"
            description="Play your first hand and it will appear here."
          />
        ) : (
          games.map((g) => <GameHistoryRow key={g.id} game={g} />)
        )}
      </div>
    </div>
  );
}
