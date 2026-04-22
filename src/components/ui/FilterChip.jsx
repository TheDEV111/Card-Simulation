import { cn } from "../../utils/cn";

export function FilterChip({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-medium border transition-all duration-150",
        active
          ? "bg-gold/15 border-gold/40 text-gold"
          : "bg-transparent border-white/10 text-white/40 hover:border-white/20 hover:text-white/60"
      )}
    >
      {label}
    </button>
  );
}

export function FilterChipGroup({ options, value, onChange }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {options.map((opt) => (
        <FilterChip
          key={opt.value}
          label={opt.label}
          active={value === opt.value}
          onClick={() => onChange(opt.value)}
        />
      ))}
    </div>
  );
}
