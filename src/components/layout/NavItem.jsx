import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";
import NavIcon from "../ui/NavIcon";

const ROUTE_TO_ICON = {
  "/":             "home",
  "/game":         "play",
  "/dashboard":    "dashboard",
  "/history":      "history",
  "/leaderboard":  "leaderboard",
  "/rewards":      "rewards",
  "/transactions": "transactions",
  "/how-to-play":  "howToPlay",
  "/settings":     "settings",
  "/profile":      "profile",
};

export default function NavItem({ to, label, onClick }) {
  const iconName = ROUTE_TO_ICON[to] ?? "home";

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-gold/10 text-gold"
            : "text-white/40 hover:text-white/70 hover:bg-surface-overlay"
        )
      }
    >
      {({ isActive }) => (
        <>
          <NavIcon
            name={iconName}
            className={cn(
              "w-5 h-5 transition-colors duration-150",
              isActive ? "text-gold" : "text-white/35 group-hover:text-white/60"
            )}
          />
          <span className="flex-1">{label}</span>
          {isActive && <span className="nav-active-dot" />}
        </>
      )}
    </NavLink>
  );
}
