import { cn } from "../../utils/cn";

const TYPES = {
  info:    "bg-surface-overlay text-white/70 border-white/15",
  warning: "bg-pending/10 text-pending border-pending/30",
  success: "bg-win/10 text-win border-win/30",
  error:   "bg-loss/10 text-loss border-loss/30",
};

export default function AlertBanner({ type = "info", icon, children, onDismiss }) {
  return (
    <div className={cn("flex items-start gap-3 px-4 py-3 rounded-xl border text-sm", TYPES[type])}>
      {icon && <span className="shrink-0">{icon}</span>}
      <p className="flex-1 leading-relaxed">{children}</p>
      {onDismiss && (
        <button onClick={onDismiss} className="shrink-0 opacity-50 hover:opacity-80 transition-opacity">✕</button>
      )}
    </div>
  );
}
