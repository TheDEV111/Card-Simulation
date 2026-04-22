import { useState } from "react";

export default function HoverCard({ trigger, content, className = "" }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {trigger}
      {open && (
        <div
          role="tooltip"
          className="absolute z-50 bottom-full left-1/2 -translate-x-1/2 mb-2 w-max max-w-xs
                     bg-surface-overlay border border-white/10 rounded-xl shadow-xl p-3
                     text-xs text-white/70 animate-in fade-in duration-150"
        >
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-surface-overlay border-r border-b border-white/10 rotate-45 -mt-1" />
          {content}
        </div>
      )}
    </div>
  );
}
