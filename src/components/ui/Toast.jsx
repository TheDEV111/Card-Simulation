import { useToast } from "../../context/ToastContext";

const ICONS = {
  success: "✓",
  error:   "✕",
  info:    "ℹ",
  warning: "⚠",
};

const COLORS = {
  success: "border-win/40 bg-win/10 text-win",
  error:   "border-loss/40 bg-loss/10 text-loss",
  info:    "border-white/15 bg-surface-overlay text-white/80",
  warning: "border-gold/40 bg-gold/10 text-gold",
};

function ToastItem({ id, message, type }) {
  const { dismiss } = useToast();
  return (
    <div
      className={[
        "flex items-center gap-3 px-4 py-3 rounded-xl border text-sm",
        "animate-fade-in-up shadow-card",
        COLORS[type] || COLORS.info,
      ].join(" ")}
    >
      <span className="font-bold">{ICONS[type]}</span>
      <span className="flex-1">{message}</span>
      <button
        onClick={() => dismiss(id)}
        className="text-white/30 hover:text-white/60 transition-colors"
      >
        ✕
      </button>
    </div>
  );
}

export default function Toasts() {
  const { toasts } = useToast();
  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]"
    >
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
    </div>
  );
}
