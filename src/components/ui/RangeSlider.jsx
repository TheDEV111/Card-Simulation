export default function RangeSlider({ value, onChange, min = 0, max = 100, step = 1, label, showValue = true, format = (v) => v, className = "" }) {
  const pct = ((value - min) / (max - min)) * 100;

  return (
    <div className={`space-y-2 ${className}`}>
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && <span className="text-xs text-white/40">{label}</span>}
          {showValue && <span className="text-xs font-semibold text-white/70 tabular-nums">{format(value)}</span>}
        </div>
      )}
      <div className="relative">
        <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full bg-gold rounded-full transition-all" style={{ width: `${pct}%` }} />
        </div>
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label}
        />
      </div>
      <div className="flex justify-between text-[10px] text-white/20">
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}
