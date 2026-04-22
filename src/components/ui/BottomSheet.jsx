import { useEffect } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";

export default function BottomSheet({ open, onClose, title, children }) {
  useScrollLock(open);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === "Escape") onClose?.(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        className="fixed bottom-0 left-0 right-0 z-50 bg-surface rounded-t-2xl border-t border-white/8 shadow-2xl
                   px-4 pb-8 pt-4 max-h-[85vh] overflow-y-auto
                   animate-in slide-in-from-bottom duration-300"
      >
        <div className="w-12 h-1 rounded-full bg-white/15 mx-auto mb-4" />
        {title && (
          <h2 id="bottom-sheet-title" className="text-base font-semibold text-white mb-4">
            {title}
          </h2>
        )}
        {children}
      </div>
    </>
  );
}
