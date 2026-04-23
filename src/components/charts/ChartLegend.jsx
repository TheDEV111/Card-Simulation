export default function ChartLegend({ items = [], className = "" }) {
  return (
    <div className={`flex flex-wrap gap-4 ${className}`}>
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-1.5">
          <span
            className="w-3 h-0.5 rounded-full flex-shrink-0"
            style={{ background: item.color ?? "#d4af37", height: "2px" }}
          />
          <span className="text-[10px] text-white/40">{item.label}</span>
        </div>
      ))}
    </div>
  );
}
