export default function StatRow({ label, value, sub, accent = false, className = "" }) {
  return (
    <div className={`flex items-center justify-between py-2 ${className}`}>
      <span className="text-xs text-white/40">{label}</span>
      <div className="text-right">
        <span className={`text-sm font-semibold ${accent ? "text-gold" : "text-white/80"}`}>{value}</span>
        {sub && <p className="text-[10px] text-white/25">{sub}</p>}
      </div>
    </div>
  );
}
