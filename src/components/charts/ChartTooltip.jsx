export default function ChartTooltip({ x, y, label, rows = [], visible }) {
  if (!visible) return null;

  return (
    <div
      className="absolute z-20 pointer-events-none bg-[#1a1a2e] border border-white/10 rounded-lg p-2 shadow-xl text-xs"
      style={{ left: x, top: y, transform: "translate(-50%, calc(-100% - 8px))" }}
    >
      {label && <p className="text-white/40 mb-1 font-semibold">{label}</p>}
      {rows.map((r, i) => (
        <div key={i} className="flex items-center gap-2">
          {r.color && <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: r.color }} />}
          <span className="text-white/60">{r.label}:</span>
          <span className="text-white/90 font-semibold">{r.value}</span>
        </div>
      ))}
    </div>
  );
}
