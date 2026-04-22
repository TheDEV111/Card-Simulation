export default function RadioGroup({ options = [], value, onChange, name, className = "" }) {
  return (
    <fieldset className={`space-y-2 ${className}`}>
      {options.map((opt) => (
        <label
          key={opt.value}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative flex-shrink-0">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              className="sr-only"
            />
            <div className={`w-4 h-4 rounded-full border-2 transition-all ${
              value === opt.value ? "border-gold bg-gold/20" : "border-white/20 bg-white/5 group-hover:border-white/40"
            }`}>
              {value === opt.value && <div className="absolute inset-0 m-auto w-2 h-2 rounded-full bg-gold" />}
            </div>
          </div>
          <div>
            <span className="text-sm text-white/60">{opt.label}</span>
            {opt.description && <p className="text-xs text-white/25">{opt.description}</p>}
          </div>
        </label>
      ))}
    </fieldset>
  );
}
