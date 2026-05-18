import { useState } from "react";
import { Link } from "react-router-dom";
import NavItem from "./NavItem";
import { ROUTES } from "../../utils/routes";

const ALL_NAV = [
  { to: ROUTES.HOME,         label: "Home" },
  { to: ROUTES.GAME,         label: "Play" },
  { to: ROUTES.DASHBOARD,    label: "Dashboard" },
  { to: ROUTES.HISTORY,      label: "History" },
  { to: ROUTES.LEADERBOARD,  label: "Leaderboard" },
  { to: ROUTES.REWARDS,      label: "Rewards" },
  { to: ROUTES.TRANSACTIONS, label: "Transactions" },
  { to: ROUTES.HOW_TO_PLAY,  label: "How to Play" },
  { to: ROUTES.SETTINGS,     label: "Settings" },
  { to: ROUTES.PROFILE,      label: "Profile" },
];

function HamburgerIcon() {
  return (
    <svg width="18" height="14" viewBox="0 0 18 14" fill="none" aria-hidden="true">
      <path d="M1 1h16M1 7h10M1 13h16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function StacksMark() {
  return (
    <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="6" width="14" height="3" rx="1.5" fill="currentColor"/>
      <rect x="3" y="11" width="10" height="3" rx="1.5" fill="currentColor"/>
    </svg>
  );
}

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 bg-surface/95 backdrop-blur-sm border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <span className="text-stacks"><StacksMark /></span>
          <span className="font-semibold text-sm text-white" style={{ fontFamily: "Cinzel, serif" }}>Card Game</span>
        </Link>
        <button
          onClick={() => setOpen(true)}
          className="w-9 h-9 flex items-center justify-center rounded-lg text-white/50 hover:text-white hover:bg-surface-overlay transition-colors"
          aria-label="Open menu"
        >
          <HamburgerIcon />
        </button>
      </header>

      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-40 animate-fade-in"
            onClick={() => setOpen(false)}
          />
          <div className="fixed top-0 right-0 bottom-0 w-64 bg-surface border-l border-white/5 z-50 p-4 flex flex-col animate-slide-in">
            <div className="flex items-center justify-between mb-6 px-1">
              <span className="font-semibold text-white text-sm" style={{ fontFamily: "Cinzel, serif" }}>Menu</span>
              <button
                onClick={() => setOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-surface-overlay transition-colors"
                aria-label="Close menu"
              >
                <CloseIcon />
              </button>
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
