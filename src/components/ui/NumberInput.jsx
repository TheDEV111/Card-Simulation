import { useCallback } from "react";
import { clamp } from "../../utils/numbers";

export default function NumberInput({ value, onChange, min = 0, max = Infinity, step = 1, label, className = "" }) {
  const increment = useCallback(() => onChange(clamp(value + step, min, max)), [value, step, min, max]);
  const decrement = useCallback(() => onChange(clamp(value - step, min, max)), [value, step, min, max]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {label && <span className="text-xs text-white/40 min-w-max">{label}</span>}
      <button
        onClick={decrement}
        disabled={value <= min}
        aria-label="Decrease"
        className="w-8 h-8 rounded-lg bg-white/8 text-white/50 hover:bg-white/12 disabled:opacity-30 transition-colors text-sm"
      >
        −
      </button>
      <input
        type="number"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(clamp(Number(e.target.value), min, max))}
        className="flex-1 min-w-0 text-center bg-white/5 border border-white/8 rounded-lg py-1.5 text-sm text-white focus:outline-none focus:border-gold/30"
      />
      <button
        onClick={increment}
        disabled={value >= max}
        aria-label="Increase"
        className="w-8 h-8 rounded-lg bg-white/8 text-white/50 hover:bg-white/12 disabled:opacity-30 transition-colors text-sm"
      >
        +
      </button>
    </div>
  );
}
