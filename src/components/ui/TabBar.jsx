import { NavLink } from "react-router-dom";

export default function TabBar({ items = [], className = "" }) {
  return (
    <nav
      aria-label="Bottom navigation"
      className={`fixed bottom-0 left-0 right-0 z-30 bg-surface/95 backdrop-blur-md border-t border-white/8
                  flex items-stretch safe-area-inset-bottom md:hidden ${className}`}
    >
      {items.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex-1 flex flex-col items-center justify-center gap-0.5 py-3 text-[10px] transition-colors min-h-[56px] ${
              isActive ? "text-gold" : "text-white/35 hover:text-white/60"
            }`
          }
          aria-label={label}
        >
          {icon && <span className="text-lg leading-none" aria-hidden="true">{icon}</span>}
          <span>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
