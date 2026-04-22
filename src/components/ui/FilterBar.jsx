export default function FilterBar({ options = [], value, onChange, className = "" }) {
  return (
    <div
      role="tablist"
      aria-label="Filter options"
      className={`flex flex-wrap gap-1.5 ${className}`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          role="tab"
          aria-selected={value === opt.value}
          onClick={() => onChange(opt.value)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
            value === opt.value
              ? "bg-gold/90 text-black shadow-sm"
              : "bg-white/6 text-white/50 hover:bg-white/10 hover:text-white/70"
          }`}
        >
          {opt.label}
          {opt.count != null && (
            <span className={`ml-1.5 text-[10px] ${value === opt.value ? "opacity-60" : "opacity-40"}`}>
              {opt.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
