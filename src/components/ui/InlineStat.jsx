export default function InlineStat({ label, value, accent = false, className = "" }) {
  return (
    <div className={`flex items-baseline gap-1.5 ${className}`}>
      <span className={`text-lg font-bold font-display ${accent ? "text-gold" : "text-white"}`}>
        {value}
      </span>
      <span className="text-xs text-white/40">{label}</span>
    </div>
  );
}
