import { useState, useRef, useEffect } from "react";

export default function SplitButton({ label, onClick, options = [], className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className={`relative inline-flex ${className}`}>
      <button
        onClick={onClick}
        className="btn-primary rounded-r-none px-5 py-2 text-sm"
      >
        {label}
      </button>
      <button
        onClick={() => setOpen((o) => !o)}
        className="btn-primary rounded-l-none border-l border-white/20 px-2 py-2 text-sm"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        ▾
      </button>
      {open && (
        <div className="absolute top-full right-0 mt-1 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl py-1 min-w-[140px] z-50">
          {options.map((o, i) => (
            <button
              key={i}
              onClick={() => { o.onClick(); setOpen(false); }}
              className="w-full px-4 py-2 text-xs text-left text-white/60 hover:bg-white/8 hover:text-white/90 transition-colors"
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
