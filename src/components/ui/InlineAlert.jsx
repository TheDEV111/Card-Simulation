const CONFIG = {
  info:    { bg: "bg-blue-50 dark:bg-blue-900/20",   text: "text-blue-700 dark:text-blue-300",   icon: "ℹ" },
  success: { bg: "bg-green-50 dark:bg-green-900/20", text: "text-green-700 dark:text-green-300", icon: "✓" },
  warning: { bg: "bg-amber-50 dark:bg-amber-900/20", text: "text-amber-700 dark:text-amber-300", icon: "⚠" },
  error:   { bg: "bg-red-50 dark:bg-red-900/20",     text: "text-red-700 dark:text-red-300",     icon: "✕" },
};

export default function InlineAlert({ variant = "info", icon, message, onDismiss, className = "" }) {
  const c = CONFIG[variant] ?? CONFIG.info;
  return (
    <div className={`flex items-center gap-2.5 rounded-xl px-4 py-3 text-sm ${c.bg} ${c.text} ${className}`} role="alert">
      <span className="shrink-0 font-bold">{icon ?? c.icon}</span>
      <span className="flex-1">{message}</span>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 rounded p-0.5 opacity-60 hover:opacity-100" aria-label="Dismiss">✕</button>
      )}
    </div>
  );
}
