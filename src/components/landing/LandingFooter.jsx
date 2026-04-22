import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import LandingSocialLinks from "./LandingSocialLinks";
import { APP_NAME } from "../../utils/constants";

const LINKS = [
  { label: "Play", to: ROUTES.GAME },
  { label: "How it works", to: ROUTES.HOW_TO_PLAY },
  { label: "Leaderboard", to: ROUTES.LEADERBOARD },
  { label: "Dashboard", to: ROUTES.DASHBOARD },
];

export default function LandingFooter() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
              {APP_NAME}
            </p>
            <p className="text-xs text-white/30">Built on Stacks · Provably Fair</p>
          </div>
          <nav className="flex flex-wrap gap-4">
            {LINKS.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className="text-xs text-white/40 hover:text-white/70 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-white/20">
            © {new Date().getFullYear()} {APP_NAME}
          </p>
          <LandingSocialLinks />
        </div>
      </div>
    </footer>
  );
}
