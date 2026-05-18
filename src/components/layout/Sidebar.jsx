import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import SidebarCTA from "../ui/SidebarCTA";
import { ROUTES } from "../../utils/routes";
import { cn } from "../../utils/cn";

const NAV = [
  { to: ROUTES.HOME,         label: "Home" },
  { to: ROUTES.GAME,         label: "Play" },
  { to: ROUTES.DASHBOARD,    label: "Dashboard" },
  { to: ROUTES.HISTORY,      label: "History" },
  { to: ROUTES.LEADERBOARD,  label: "Leaderboard" },
  { to: ROUTES.REWARDS,      label: "Rewards" },
  { to: ROUTES.TRANSACTIONS, label: "Transactions" },
];

const NAV_BOTTOM = [
  { to: ROUTES.HOW_TO_PLAY, label: "How to Play" },
  { to: ROUTES.SETTINGS,    label: "Settings" },
  { to: ROUTES.PROFILE,     label: "Profile" },
];

// Stacks "S" mark — two horizontal bars offset, the brand motif
function StacksMark() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="14" height="3" rx="1.5" fill="currentColor"/>
      <rect x="3" y="11" width="10" height="3" rx="1.5" fill="currentColor"/>
    </svg>
  );
}

export default function Sidebar({ className }) {
  return (
    <aside className={cn("flex flex-col w-56 shrink-0 h-screen sticky top-0 border-r border-white/5 bg-surface p-4", className)}>
      <Link to={ROUTES.HOME} className="flex items-center gap-2.5 px-3 py-2 mb-6">
        <span className="text-stacks flex items-center">
          <StacksMark />
        </span>
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
