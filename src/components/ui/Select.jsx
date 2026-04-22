export default function Select({ options = [], value, onChange, label, id, className = "" }) {
  const selectId = id ?? `select-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label htmlFor={selectId} className="text-xs text-white/40">{label}</label>
      )}
      <div className="relative">
        <select
          id={selectId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white/70 appearance-none focus:outline-none focus:border-gold/30 transition-colors cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-gray-900">
              {opt.label}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/25 pointer-events-none text-xs" aria-hidden="true">
          ▾
        </span>
      </div>
    </div>
  );
}
