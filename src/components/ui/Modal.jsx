import { useEffect } from "react";
import { cn } from "../../utils/cn";

export default function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return;
    const handler = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full max-w-md panel p-6 shadow-card animate-fade-in-up",
          className
        )}
      >
        <div className="flex items-center justify-between mb-5">
          {title && (
            <h3 className="text-base font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
              {title}
            </h3>
          )}
          <button
            onClick={onClose}
            className="ml-auto text-white/30 hover:text-white/60 transition-colors text-lg leading-none"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
