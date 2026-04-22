export default function ResultCount({ count, total, noun = "result", className = "" }) {
  const filtered = count !== total;
  return (
    <p className={`text-xs text-white/30 ${className}`} aria-live="polite">
      {filtered ? (
        <><span className="text-white/60">{count}</span> of {total} {noun}{total !== 1 ? "s" : ""}</>
      ) : (
        <>{count} {noun}{count !== 1 ? "s" : ""}</>
      )}
    </p>
  );
}
