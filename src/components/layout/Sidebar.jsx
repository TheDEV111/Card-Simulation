import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import SidebarCTA from "../ui/SidebarCTA";
import { ROUTES } from "../../utils/routes";
import { cn } from "../../utils/cn";

const NAV = [
  { to: ROUTES.HOME,         icon: "🏠", label: "Home" },
  { to: ROUTES.GAME,         icon: "🃏", label: "Play" },
  { to: ROUTES.DASHBOARD,    icon: "📊", label: "Dashboard" },
  { to: ROUTES.HISTORY,      icon: "📋", label: "History" },
  { to: ROUTES.LEADERBOARD,  icon: "🏆", label: "Leaderboard" },
  { to: ROUTES.REWARDS,      icon: "⭐", label: "Rewards" },
  { to: ROUTES.TRANSACTIONS, icon: "💸", label: "Transactions" },
];

const NAV_BOTTOM = [
  { to: ROUTES.HOW_TO_PLAY, icon: "❓", label: "How to Play" },
  { to: ROUTES.SETTINGS,    icon: "⚙️", label: "Settings" },
  { to: ROUTES.PROFILE,     icon: "👤", label: "Profile" },
];

export default function Sidebar({ className }) {
  return (
    <aside className={cn("flex flex-col w-56 shrink-0 h-screen sticky top-0 border-r border-white/5 bg-surface p-4", className)}>
      <Link to={ROUTES.HOME} className="flex items-center gap-2.5 px-3 py-2 mb-6">
        <span className="text-2xl">🃏</span>
        <span className="font-semibold text-white text-sm tracking-wide" style={{ fontFamily: "Cinzel, serif" }}>
          Card Game
        </span>
      </Link>

      <nav className="flex-1 space-y-0.5">
        {NAV.map((item) => <NavItem key={item.to} {...item} />)}
      </nav>

      <SidebarCTA />
      <div className="space-y-0.5 pt-3 border-t border-white/5">
        {NAV_BOTTOM.map((item) => <NavItem key={item.to} {...item} />)}
      </div>
    </aside>
  );
}
