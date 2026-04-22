export default function StatRow({ label, value, highlight = false, className = "" }) {
  return (
    <div className={`flex items-center justify-between py-3 border-b border-white/5 last:border-0 ${className}`}>
      <span className="text-sm text-white/50">{label}</span>
      <span className={`text-sm font-semibold ${highlight ? "text-gold" : "text-white"}`}>
        {value}
      </span>
    </div>
  );
}
