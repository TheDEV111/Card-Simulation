const VARIANTS = {
  info:    { icon: "ℹ️", bg: "bg-blue-50 dark:bg-blue-900/20",    text: "text-blue-800 dark:text-blue-200",   border: "border-blue-200 dark:border-blue-800" },
  success: { icon: "✅", bg: "bg-green-50 dark:bg-green-900/20",  text: "text-green-800 dark:text-green-200", border: "border-green-200 dark:border-green-800" },
  warning: { icon: "⚠️", bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-800 dark:text-amber-200", border: "border-amber-200 dark:border-amber-800" },
  error:   { icon: "❌", bg: "bg-red-50 dark:bg-red-900/20",     text: "text-red-800 dark:text-red-200",     border: "border-red-200 dark:border-red-800" },
};

export default function Callout({ variant = "info", icon, title, children, className = "" }) {
  const v = VARIANTS[variant] ?? VARIANTS.info;
  return (
    <div className={`rounded-xl border p-4 ${v.bg} ${v.border} ${className}`}>
      <div className={`flex items-start gap-3 ${v.text}`}>
        <span className="mt-0.5 shrink-0 text-base leading-none">{icon ?? v.icon}</span>
        <div>
          {title && <p className="mb-1 font-semibold">{title}</p>}
          <div className="text-sm opacity-90">{children}</div>
        </div>
      </div>
    </div>
  );
}
