import { useGameHistory } from "../../hooks/useGameHistory";
import GameResultCard from "../ui/GameResultCard";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function DashboardLastGame() {
  const { games } = useGameHistory();
  const last = games[0];

  if (!last) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="label-caps">Last game</p>
        <Link to={ROUTES.HISTORY} className="text-xs text-gold/70 hover:text-gold transition-colors">
          History →
        </Link>
      </div>
      <GameResultCard game={last} />
    </div>
  );
}
