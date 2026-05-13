import { useState } from "react";

export default function NavGroup({ label, icon, items = [], defaultOpen = false, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
      >
        <span className="flex items-center gap-2">
          {icon}
          {label}
        </span>
        <span className="text-gray-300 dark:text-gray-600">{open ? "▾" : "▸"}</span>
      </button>
      {open && (
        <div className="ml-3 mt-1 space-y-1 border-l border-gray-100 pl-3 dark:border-gray-800">
          {items.map((item, i) => (
            <a
              key={i}
              href={item.href}
              className={`block rounded-lg px-2 py-1.5 text-sm transition-colors ${item.active ? "text-indigo-600 dark:text-indigo-400" : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
