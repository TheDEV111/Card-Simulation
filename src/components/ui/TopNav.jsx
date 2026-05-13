export default function TopNav({ logo, items = [], actions, className = "" }) {
  return (
    <header className={`flex h-14 items-center gap-4 border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-950 ${className}`}>
      {logo && <div className="shrink-0">{logo}</div>}
      <nav className="hidden flex-1 items-center gap-1 sm:flex">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${item.active ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-white" : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"}`}
          >
            {item.label}
          </a>
        ))}
      </nav>
      {actions && <div className="ml-auto flex items-center gap-2">{actions}</div>}
    </header>
  );
}
