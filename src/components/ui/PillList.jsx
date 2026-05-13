export default function PillList({ items, className = "" }) {
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <span
          key={typeof item === "string" ? item : item.label}
          className="inline-flex items-center px-3 py-1 rounded-full bg-surface-overlay border border-white/8 text-xs text-white/50"
        >
          {typeof item === "string" ? item : item.label}
        </span>
      ))}
    </div>
  );
}
