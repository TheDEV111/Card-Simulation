export default function EmptyResults({ query, onClear, className = "" }) {
  return (
    <div className={`flex flex-col items-center justify-center gap-3 py-12 text-center ${className}`}>
      <span className="text-3xl text-white/10" aria-hidden="true">♦</span>
      <div className="space-y-1">
        <p className="text-sm text-white/40">
          {query ? `No results for "${query}"` : "Nothing here yet"}
        </p>
        {query && (
          <p className="text-xs text-white/20">Try a different search term</p>
        )}
      </div>
      {query && onClear && (
        <button
          onClick={onClear}
          className="text-xs text-gold/60 hover:text-gold transition-colors"
        >
          Clear search
        </button>
      )}
    </div>
  );
}
