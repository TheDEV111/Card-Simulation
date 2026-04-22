import { useState } from "react";

export default function Tooltip({ children, content, position = "top" }) {
  const [open, setOpen] = useState(false);

  const posMap = {
    top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left:   "right-full top-1/2 -translate-y-1/2 mr-2",
    right:  "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <div
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <div
          role="tooltip"
          className={`absolute z-50 px-2.5 py-1.5 rounded-lg bg-surface-high border border-white/10 text-xs text-white/80 whitespace-nowrap pointer-events-none shadow-lg ${posMap[position]}`}
        >
          {content}
        </div>
      )}
    </div>
  );
}
