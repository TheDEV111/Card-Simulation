import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function DashboardEmptyState() {
  return (
    <div className="panel p-12 text-center space-y-5">
      <div className="text-5xl">🃏</div>
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          No games yet
        </h2>
        <p className="text-sm text-white/40 max-w-xs mx-auto">
          Play your first game to unlock stats, rankings, and achievements.
        </p>
      </div>
      <Link
        to={ROUTES.GAME}
        className="inline-block px-8 py-3 rounded-xl bg-gold text-surface font-bold hover:bg-gold-light transition-colors"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        Play your first game
      </Link>
    </div>
  );
}
