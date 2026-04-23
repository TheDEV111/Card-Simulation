import { useEffect } from "react";
import { useScrollLock } from "../../hooks/useScrollLock";

export default function Drawer({ open, onClose, title, children, side = "right" }) {
  useScrollLock(open);

  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  const slideFrom = side === "right" ? "right-0 translate-x-full" : "left-0 -translate-x-full";

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        aria-hidden
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`fixed top-0 ${side === "right" ? "right-0" : "left-0"} bottom-0 z-50 w-80 bg-[#0f0f1a] border-${side === "right" ? "l" : "r"} border-white/8 flex flex-col`}
        style={{ animation: "slideInDrawer 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/8">
          <h2 className="text-sm font-semibold text-white/80">{title}</h2>
          <button onClick={onClose} className="text-white/30 hover:text-white/60 text-lg leading-none">✕</button>
        </div>
        <div className="flex-1 overflow-y-auto p-5">{children}</div>
      </div>
      <style>{`@keyframes slideInDrawer { from { transform: translateX(${side === "right" ? "100%" : "-100%"}); } to { transform: translateX(0); } }`}</style>
    </>
  );
}
