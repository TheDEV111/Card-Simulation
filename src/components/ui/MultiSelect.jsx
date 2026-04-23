import { useState, useRef, useEffect } from "react";

export default function MultiSelect({ options = [], value = [], onChange, placeholder = "Select…", className = "" }) {
  const [open, setOpen]       = useState(false);
  const [search, setSearch]   = useState("");
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filtered = options.filter((o) => o.label.toLowerCase().includes(search.toLowerCase()));

  const toggle = (v) => {
    onChange(value.includes(v) ? value.filter((x) => x !== v) : [...value, v]);
  };

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 bg-white/8 border border-white/10 rounded-lg px-3 py-2 text-xs text-white/60 focus:outline-none focus:ring-2 focus:ring-gold/40"
      >
        <span className="truncate">
          {value.length ? `${value.length} selected` : placeholder}
        </span>
        <span className="text-white/30">▾</span>
      </button>

      {value.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-1">
          {value.map((v) => {
            const label = options.find((o) => o.value === v)?.label ?? v;
            return (
              <span key={v} className="flex items-center gap-1 text-[10px] bg-white/10 rounded-full px-2 py-0.5 text-white/60">
                {label}
                <button onClick={() => toggle(v)} className="text-white/30 hover:text-white/60">✕</button>
              </span>
            );
          })}
        </div>
      )}

      {open && (
        <div className="absolute z-50 top-full mt-1 w-full bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl py-1">
          <div className="px-3 py-2">
            <input
              autoFocus
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search…"
              className="w-full bg-white/5 text-xs text-white/60 rounded px-2 py-1 outline-none placeholder-white/25"
            />
          </div>
          <div className="max-h-40 overflow-y-auto">
            {filtered.map((o) => (
              <button
                key={o.value}
                onClick={() => toggle(o.value)}
                className="w-full px-4 py-2 text-xs text-left flex items-center gap-2 hover:bg-white/6 transition-colors"
              >
                <span className={`w-3.5 h-3.5 rounded border flex items-center justify-center flex-shrink-0 ${value.includes(o.value) ? "bg-gold border-gold" : "border-white/20"}`}>
                  {value.includes(o.value) && <span className="text-[8px] text-black font-bold">✓</span>}
                </span>
                <span className="text-white/60">{o.label}</span>
              </button>
            ))}
            {filtered.length === 0 && <p className="px-4 py-2 text-xs text-white/25">No results</p>}
          </div>
        </div>
      )}
    </div>
  );
}
