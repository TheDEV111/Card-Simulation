import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-6 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-xl">🃏</span>
          <span className="text-sm text-white/30" style={{ fontFamily: "Cinzel, serif" }}>
            Stacks Card Game
          </span>
        </div>
        <div className="flex items-center gap-6 text-xs text-white/30">
          <Link to={ROUTES.HOW_TO_PLAY} className="hover:text-white/60 transition-colors">How to Play</Link>
          <Link to={ROUTES.LEADERBOARD} className="hover:text-white/60 transition-colors">Leaderboard</Link>
          <Link to={ROUTES.SETTINGS}    className="hover:text-white/60 transition-colors">Settings</Link>
        </div>
        <p className="text-xs text-white/20">
          Built on Stacks · Provably Fair
        </p>
      </div>
    </footer>
  );
}
