import { useState, useEffect, useRef } from "react";

export default function CommandPalette({ commands = [], onClose }) {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef(null);

  const filtered = commands.filter((c) =>
    c.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { setActiveIndex(0); }, [query]);

  function handleKeyDown(e) {
    if (e.key === "Escape") return onClose?.();
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter" && filtered[activeIndex]) {
      filtered[activeIndex].action();
      onClose?.();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4" onClick={onClose}>
      <div
        className="w-full max-w-lg rounded-2xl bg-white shadow-2xl ring-1 ring-black/5 dark:bg-gray-900 dark:ring-white/10"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        <div className="flex items-center gap-3 border-b border-gray-100 px-4 dark:border-gray-800">
          <span className="text-gray-400">⌘</span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search commands…"
            className="flex-1 bg-transparent py-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
          />
        </div>
        <ul className="max-h-72 overflow-y-auto py-2">
          {filtered.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-gray-400">No results found</li>
          ) : (
            filtered.map((cmd, i) => (
              <li
                key={cmd.id ?? cmd.label}
                className={`flex cursor-pointer items-center gap-3 px-4 py-2.5 text-sm ${
                  i === activeIndex
                    ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300"
                    : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"
                }`}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => { cmd.action(); onClose?.(); }}
              >
                {cmd.icon && <span className="text-base">{cmd.icon}</span>}
                <span>{cmd.label}</span>
                {cmd.shortcut && (
                  <span className="ml-auto text-xs text-gray-400">{cmd.shortcut}</span>
                )}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
