import { useState } from "react";

export function SidebarItem({ icon, label, active, badge, onClick, href }) {
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${active ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white"}`}
    >
      {icon && <span className="h-5 w-5 shrink-0">{icon}</span>}
      <span className="flex-1 text-left">{label}</span>
      {badge != null && (
        <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-semibold text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-300">
          {badge}
        </span>
      )}
    </Tag>
  );
}

export default function Sidebar({ items = [], header, footer, collapsible = false, className = "" }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside className={`flex flex-col ${collapsed ? "w-16" : "w-60"} transition-all duration-200 ${className}`}>
      {header && !collapsed && <div className="mb-4">{header}</div>}
      {collapsible && (
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="mb-2 self-end rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 dark:hover:bg-gray-800"
        >
          {collapsed ? "→" : "←"}
        </button>
      )}
      <nav className="flex-1 space-y-1">
        {items.map((item, i) =>
          item.divider ? (
            <hr key={i} className="my-2 border-gray-100 dark:border-gray-800" />
          ) : (
            <SidebarItem key={i} {...item} />
          )
        )}
      </nav>
      {footer && !collapsed && <div className="mt-4">{footer}</div>}
    </aside>
  );
}
