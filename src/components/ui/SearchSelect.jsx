import { useState, useRef } from "react";
import { useClickOutside } from "../../hooks/useClickOutside";

export default function SearchSelect({ options = [], value, onChange, placeholder = "Search…", className = "" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  useClickOutside(ref, () => setOpen(false));

  const filtered = options.filter((o) =>
    (o.label ?? o).toLowerCase().includes(query.toLowerCase())
  );

  const selected = options.find((o) => (o.value ?? o) === value);

  function pick(opt) {
    onChange?.(opt.value ?? opt);
    setQuery("");
    setOpen(false);
  }

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm dark:border-gray-600 dark:bg-gray-800"
      >
        <span className={selected ? "text-gray-900 dark:text-white" : "text-gray-400"}>
          {selected ? (selected.label ?? selected) : placeholder}
        </span>
        <span className="text-gray-400">{open ? "▴" : "▾"}</span>
      </button>
      {open && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-900">
          <div className="p-2">
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search…"
              className="w-full rounded-lg bg-gray-100 px-3 py-1.5 text-sm outline-none dark:bg-gray-800 dark:text-white"
            />
          </div>
          <ul className="max-h-52 overflow-y-auto py-1">
            {filtered.map((opt) => {
              const val = opt.value ?? opt;
              const label = opt.label ?? opt;
              return (
                <li
                  key={val}
                  onClick={() => pick(opt)}
                  className={`cursor-pointer px-3 py-2 text-sm ${val === value ? "bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300" : "text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800"}`}
                >
                  {label}
                </li>
              );
            })}
            {filtered.length === 0 && <li className="px-3 py-4 text-center text-xs text-gray-400">No results</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
