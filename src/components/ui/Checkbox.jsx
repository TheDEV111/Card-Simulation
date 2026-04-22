export default function Checkbox({ checked, onChange, label, id, disabled = false, className = "" }) {
  const inputId = id ?? `cb-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <label
      htmlFor={inputId}
      className={`flex items-center gap-2.5 cursor-pointer group ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      <div className="relative flex-shrink-0">
        <input
          id={inputId}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={`w-4 h-4 rounded border transition-colors ${
            checked
              ? "bg-gold border-gold"
              : "border-white/20 bg-white/5 group-hover:border-white/40"
          }`}
        >
          {checked && (
            <svg viewBox="0 0 12 12" className="w-full h-full p-0.5" fill="none">
              <polyline points="1,6 4,10 11,2" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
        </div>
      </div>
      {label && <span className="text-sm text-white/60">{label}</span>}
    </label>
  );
}
