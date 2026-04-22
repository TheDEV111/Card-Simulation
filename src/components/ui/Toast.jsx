import { useToast } from "../../context/ToastContext";

const ICONS = {
  success: "✓",
  error:   "✕",
  info:    "·",
  warning: "!",
};

const COLORS = {
  success: "border-win/40 bg-win/10 text-win",
  error:   "border-loss/40 bg-loss/10 text-loss",
  info:    "border-white/20 bg-surface-overlay text-white/80",
  warning: "border-pending/40 bg-pending/10 text-pending",
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
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
      {toasts.map((t) => (
        <ToastItem key={t.id} {...t} />
      ))}
    </div>
  );
}
