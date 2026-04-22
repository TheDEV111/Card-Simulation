export default function SortableHeader({ label, field, currentSort, onSort, className = "" }) {
  const active = currentSort?.field === field;
  const asc    = active && currentSort?.dir === "asc";

  return (
    <th
      scope="col"
      className={`px-4 py-3 text-left ${className}`}
    >
      <button
        onClick={() => onSort?.(field, active && !asc ? "asc" : "desc")}
        className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider hover:text-white transition-colors ${
          active ? "text-gold" : "text-white/35"
        }`}
        aria-sort={active ? (asc ? "ascending" : "descending") : "none"}
      >
        {label}
        <span aria-hidden="true" className="text-[10px]">
          {active ? (asc ? "▲" : "▼") : "⇅"}
        </span>
      </button>
    </th>
  );
}
