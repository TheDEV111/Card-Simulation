const VARIANTS = {
  info:    "bg-gold/5 border-gold/20 text-gold/70",
  success: "bg-win/5 border-win/20 text-win/70",
  warning: "bg-pending/5 border-pending/20 text-pending/70",
  error:   "bg-loss/5 border-loss/20 text-loss/70",
};

const ICONS = { info: "ℹ", success: "✓", warning: "⚠", error: "✕" };

export default function Callout({ variant = "info", title, children }) {
  return (
    <div className={`rounded-xl border px-4 py-3 ${VARIANTS[variant]}`}>
      <div className="flex gap-3">
        <span className="text-sm flex-shrink-0 mt-0.5">{ICONS[variant]}</span>
        <div className="space-y-1">
          {title && (
            <p className="text-sm font-semibold">{title}</p>
          )}
          <p className="text-xs leading-relaxed opacity-80">{children}</p>
        </div>
      </div>
    </div>
  );
}
