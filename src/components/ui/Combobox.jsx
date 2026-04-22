import { useState, useRef, useEffect } from "react";

export default function Combobox({ options = [], value, onChange, placeholder = "Select…", className = "" }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const ref = useRef(null);

  const filtered = options.filter((o) =>
    o.label.toLowerCase().includes(query.toLowerCase())
  );

  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const select = (opt) => { onChange(opt.value); setQuery(""); setOpen(false); };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="w-full flex items-center justify-between gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-left hover:border-white/20 transition-colors"
      >
        <span className={selected ? "text-white/70" : "text-white/25"}>{selected?.label ?? placeholder}</span>
        <span className="text-white/25 text-xs" aria-hidden="true">{open ? "▴" : "▾"}</span>
      </button>

      {open && (
        <div
          role="listbox"
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-surface border border-white/10 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto"
        >
          {options.length > 5 && (
            <div className="px-3 py-2 border-b border-white/8">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className="w-full bg-white/5 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none"
                autoFocus
              />
            </div>
          )}
          {filtered.map((opt) => (
            <button
              key={opt.value}
              role="option"
              aria-selected={opt.value === value}
              onClick={() => select(opt)}
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                opt.value === value ? "bg-gold/15 text-gold" : "text-white/60 hover:bg-white/5 hover:text-white"
              }`}
            >
              {opt.label}
            </button>
          ))}
          {filtered.length === 0 && (
            <p className="px-4 py-3 text-sm text-white/25">No options</p>
          )}
        </div>
      )}
    </div>
  );
}
