const VARIANTS = {
  info:    { bg: "bg-white/5",   text: "text-white/70",  icon: "ℹ" },
  success: { bg: "bg-win/10",    text: "text-win",       icon: "✓" },
  warning: { bg: "bg-gold/10",   text: "text-gold",      icon: "⚠" },
  error:   { bg: "bg-loss/10",   text: "text-loss",      icon: "✕" },
};

export default function AlertBox({ variant = "info", title, children, className = "" }) {
  const v = VARIANTS[variant] ?? VARIANTS.info;

  return (
    <div role="alert" className={`flex gap-3 rounded-lg p-4 ${v.bg} ${className}`}>
      <span className={`flex-shrink-0 text-sm font-bold ${v.text}`}>{v.icon}</span>
      <div className="min-w-0 space-y-0.5">
        {title && <p className={`text-sm font-semibold ${v.text}`}>{title}</p>}
        <div className="text-xs text-white/50">{children}</div>
      </div>
    </div>
  );
}
