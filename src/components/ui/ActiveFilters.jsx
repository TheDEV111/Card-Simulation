export default function ActiveFilters({ filters = [], onRemove, onClearAll, className = "" }) {
  if (filters.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      <span className="text-xs text-white/25">Filters:</span>
      {filters.map((f) => (
        <button
          key={f.key}
          onClick={() => onRemove?.(f.key)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/8 text-white/50 text-xs hover:bg-white/12 transition-colors"
        >
          <span>{f.label}</span>
          <span aria-hidden="true" className="text-white/30">✕</span>
          <span className="sr-only">Remove filter</span>
        </button>
      ))}
      {filters.length > 1 && (
        <button
          onClick={onClearAll}
          className="text-xs text-gold/60 hover:text-gold transition-colors"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
