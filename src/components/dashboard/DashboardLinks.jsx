import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

const LINKS = [
  { label: "Game history",   to: ROUTES.HISTORY,      icon: "📋" },
  { label: "Leaderboard",    to: ROUTES.LEADERBOARD,  icon: "🏆" },
  { label: "How to play",    to: ROUTES.HOW_TO_PLAY,  icon: "📖" },
  { label: "Rewards",        to: ROUTES.REWARDS,      icon: "🎖" },
  { label: "Transactions",   to: ROUTES.TRANSACTIONS, icon: "⛓" },
  { label: "Settings",       to: ROUTES.SETTINGS,     icon: "⚙️" },
];

export default function DashboardLinks() {
  return (
    <div className="panel overflow-hidden">
      <p className="label-caps px-5 py-3 border-b border-white/5">Quick links</p>
      <div className="divide-y divide-white/5">
        {LINKS.map(({ label, to, icon }) => (
          <Link
            key={to}
            to={to}
            className="flex items-center gap-3 px-5 py-3 hover:bg-surface-overlay/60 transition-colors group"
          >
            <span className="text-base w-5 text-center">{icon}</span>
            <span className="text-sm text-white/70 group-hover:text-white transition-colors flex-1">{label}</span>
            <span className="text-white/20 text-xs group-hover:text-gold/50 transition-colors">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
