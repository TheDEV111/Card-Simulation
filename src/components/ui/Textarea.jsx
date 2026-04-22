export default function Textarea({ label, id, error, hint, rows = 4, maxLength, className = "", ...props }) {
  const inputId = id ?? `textarea-${label?.toLowerCase().replace(/\s+/g, "-")}`;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {label && (
        <label htmlFor={inputId} className="text-xs font-medium text-white/50">{label}</label>
      )}
      <textarea
        id={inputId}
        rows={rows}
        maxLength={maxLength}
        aria-invalid={error ? "true" : undefined}
        className={`w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/20 focus:outline-none transition-colors resize-y ${
          error ? "border-loss/50 focus:border-loss/70" : "border-white/10 focus:border-gold/30"
        }`}
        {...props}
      />
      <div className="flex items-start justify-between">
        {error ? <p role="alert" className="text-xs text-loss">{error}</p> : <p className="text-xs text-white/30">{hint ?? ""}</p>}
        {maxLength && (
          <p className="text-xs text-white/20 ml-4 flex-shrink-0">
            {typeof props.value === "string" ? props.value.length : 0}/{maxLength}
          </p>
        )}
      </div>
    </div>
  );
}
