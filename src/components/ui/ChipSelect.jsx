export default function ChipSelect({ options, value, onChange, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {options.map((opt) => {
        const label = typeof opt === "string" ? opt : opt.label;
        const val = typeof opt === "string" ? opt : opt.value;
        const active = val === value;
        return (
          <button
            key={val}
            type="button"
            onClick={() => onChange(val)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 ${
              active
                ? "bg-gold text-surface"
                : "bg-surface-overlay border border-white/10 text-white/50 hover:border-gold/30 hover:text-white/80"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
