export default function InfoCard({ icon, title, value, sub, className = "" }) {
  return (
    <div className={`panel p-4 space-y-2 ${className}`}>
      <div className="flex items-center gap-2">
        {icon && <span className="text-lg">{icon}</span>}
        <p className="text-xs text-white/40">{title}</p>
      </div>
      <p className="text-xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
        {value}
      </p>
      {sub && <p className="text-xs text-white/30">{sub}</p>}
    </div>
  );
}
