export default function TextInput({ label, id, type = "text", error, hint, className = "", ...props }) {
  const inputId = id ?? `input-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-white/50">{label}</label>
      )}
      <input
        id={inputId}
        type={type}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        aria-invalid={error ? "true" : undefined}
        className={`w-full bg-white/5 border rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors ${
          error
            ? "border-loss/50 focus:border-loss/70"
            : "border-white/10 focus:border-gold/30"
        }`}
        {...props}
      />
      {error && <p id={`${inputId}-error`} role="alert" className="text-xs text-loss">{error}</p>}
      {hint && !error && <p id={`${inputId}-hint`} className="text-xs text-white/30">{hint}</p>}
    </div>
  );
}
