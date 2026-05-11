import { useState } from "react";

export default function StickyBanner({ children, dismissable = true, position = "top", className = "" }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const pos = position === "bottom"
    ? "bottom-0 left-0 right-0"
    : "top-0 left-0 right-0";

  return (
    <div
      className={`fixed z-40 flex items-center justify-between gap-4 px-4 py-3 ${pos} bg-indigo-600 text-white text-sm font-medium shadow-lg ${className}`}
    >
      <div className="flex-1 text-center">{children}</div>
      {dismissable && (
        <button
          type="button"
          onClick={() => setDismissed(true)}
          className="shrink-0 rounded-full p-1 hover:bg-indigo-700 transition-colors"
          aria-label="Dismiss"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
}
