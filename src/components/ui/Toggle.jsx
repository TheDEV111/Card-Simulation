import { cn } from "../../utils/cn";

export default function Toggle({ checked, onChange, label, disabled }) {
  return (
    <label className={cn("flex items-center gap-3 cursor-pointer select-none", disabled && "opacity-40 cursor-not-allowed")}>
      <button
        role="switch"
        aria-checked={checked}
        onClick={() => !disabled && onChange(!checked)}
        className={cn(
          "relative w-10 h-6 rounded-full border transition-all duration-200",
          checked ? "bg-gold/20 border-gold/50" : "bg-surface-overlay border-white/15"
        )}
      >
        <span
          className={cn(
            "absolute top-0.5 w-5 h-5 rounded-full transition-all duration-200",
            checked ? "bg-gold translate-x-4" : "bg-white/30 translate-x-0.5"
          )}
        />
      </button>
      {label && <span className="text-sm text-white/70">{label}</span>}
    </label>
  );
}
