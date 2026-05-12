import { useState } from "react";

export default function AnnouncementBar({ message, cta, href, onDismiss, className = "" }) {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  return (
    <div className={`flex items-center justify-center gap-3 bg-indigo-600 px-4 py-2.5 text-sm text-white ${className}`}>
      <span>{message}</span>
      {cta && href && (
        <a href={href} className="shrink-0 rounded-full bg-white/20 px-3 py-0.5 text-xs font-semibold hover:bg-white/30 transition-colors">
          {cta} →
        </a>
      )}
      <button
        onClick={() => { setDismissed(true); onDismiss?.(); }}
        className="ml-auto shrink-0 opacity-60 hover:opacity-100"
        aria-label="Dismiss"
      >
        ✕
      </button>
    </div>
  );
}
