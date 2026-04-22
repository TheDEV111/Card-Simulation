export default function AccessibleToggle({ checked, onChange, label, description, id, className = "" }) {
  const inputId = id ?? `toggle-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`flex items-center justify-between gap-4 ${className}`}>
      <div>
        <label htmlFor={inputId} className="text-sm text-white/70 cursor-pointer">{label}</label>
        {description && <p className="text-xs text-white/30 mt-0.5">{description}</p>}
      </div>
      <button
        id={inputId}
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-gold/60 ${
          checked ? "bg-gold" : "bg-white/15"
        }`}
      >
        <span
          className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
        <span className="sr-only">{checked ? "On" : "Off"}</span>
      </button>
    </div>
  );
}
