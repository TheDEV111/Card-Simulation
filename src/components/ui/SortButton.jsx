export default function SortButton({ field, current, direction, onClick, children }) {
  const active = current === field;
  const arrow = active ? (direction === "asc" ? " ↑" : " ↓") : "";

  return (
    <button
      type="button"
      onClick={() => onClick(field)}
      className={`text-xs uppercase tracking-wider font-medium transition-colors ${
        active ? "text-gold" : "text-white/40 hover:text-white/60"
      }`}
    >
      {children}{arrow}
    </button>
  );
}
