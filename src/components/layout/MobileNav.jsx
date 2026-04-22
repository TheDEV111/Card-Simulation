import { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { ROUTES } from "../../utils/routes";

const ALL_NAV = [
  { to: ROUTES.HOME,         icon: "🏠", label: "Home" },
  { to: ROUTES.GAME,         icon: "🃏", label: "Play" },
  { to: ROUTES.DASHBOARD,    icon: "📊", label: "Dashboard" },
  { to: ROUTES.HISTORY,      icon: "📋", label: "History" },
  { to: ROUTES.LEADERBOARD,  icon: "🏆", label: "Leaderboard" },
  { to: ROUTES.REWARDS,      icon: "⭐", label: "Rewards" },
  { to: ROUTES.TRANSACTIONS, icon: "💸", label: "Transactions" },
  { to: ROUTES.HOW_TO_PLAY,  icon: "❓", label: "How to Play" },
  { to: ROUTES.SETTINGS,     icon: "⚙️", label: "Settings" },
  { to: ROUTES.PROFILE,      icon: "👤", label: "Profile" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-xl">🃏</span>
          <span className="font-semibold text-sm text-white" style={{ fontFamily: "Cinzel, serif" }}>Card Game</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-white/60 hover:text-white hover:bg-surface-overlay transition-colors"
          aria-label="Open menu"
        >
          ☰
        </button>
      </header>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-surface z-50 p-4 flex flex-col animate-slide-in">
            <div className="flex items-center justify-between mb-6">
              <span className="font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>Menu</span>
              <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white text-lg">✕</button>
            </div>
            <nav className="space-y-0.5 flex-1">
              {ALL_NAV.map((item) => (
                <NavItem key={item.to} {...item} onClick={() => setOpen(false)} />
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
