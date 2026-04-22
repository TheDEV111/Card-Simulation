import { NavLink } from "react-router-dom";
import { cn } from "../../utils/cn";

export default function NavItem({ to, icon, label, onClick }) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150",
          isActive
            ? "bg-gold/15 text-gold"
            : "text-white/40 hover:text-white/70 hover:bg-surface-overlay"
        )
      }
    >
      <span className="text-base w-5 text-center">{icon}</span>
      <span>{label}</span>
    </NavLink>
  );
}
