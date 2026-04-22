import { useState } from "react";
import { cn } from "../../utils/cn";

export function Tabs({ tabs, defaultTab, children }) {
  const [active, setActive] = useState(defaultTab || tabs[0]?.id);

  return (
    <div>
      <div className="flex gap-1 bg-surface-overlay p-1 rounded-xl">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={cn(
              "flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-150",
              active === tab.id
                ? "bg-surface-raised text-white shadow-card"
                : "text-white/40 hover:text-white/60"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {typeof children === "function" ? children(active) : children}
      </div>
    </div>
  );
}

export function TabPanel({ id, active, children }) {
  if (id !== active) return null;
  return <div className="animate-fade-in">{children}</div>;
}
