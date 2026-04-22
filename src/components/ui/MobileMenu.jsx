import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useScrollLock } from "../../hooks/useScrollLock";
import { ROUTES } from "../../utils/routes";

const LINKS = [
  { to: ROUTES.home,        label: "Home" },
  { to: ROUTES.game,        label: "Play" },
  { to: ROUTES.dashboard,   label: "Dashboard" },
  { to: ROUTES.leaderboard, label: "Leaderboard" },
  { to: ROUTES.history,     label: "History" },
  { to: ROUTES.howToPlay,   label: "How to Play" },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  useScrollLock(open);

  return (
    <>
      <button
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((o) => !o)}
        className="flex flex-col gap-1.5 p-2 md:hidden"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`block h-px bg-white/60 transition-all duration-300 ${
              i === 1 ? "w-4" : "w-6"
            } ${open && i === 0 ? "rotate-45 translate-y-2 w-6" : ""}
              ${open && i === 1 ? "opacity-0 -translate-x-2" : ""}
              ${open && i === 2 ? "-rotate-45 -translate-y-2 w-6" : ""}`}
          />
        ))}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-md flex flex-col pt-20 px-6 gap-2 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {LINKS.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `text-xl py-3 border-b border-white/5 transition-colors ${
                  isActive ? "text-gold" : "text-white/60 hover:text-white"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>
      )}
    </>
  );
}
