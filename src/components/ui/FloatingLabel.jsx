import { useState } from "react";

export default function FloatingLabel({ label, id, children, className = "" }) {
  const [focused, setFocused] = useState(false);

  return (
    <div className={`relative ${className}`}>
      <label
        htmlFor={id}
        className={`absolute left-3 transition-all duration-200 pointer-events-none ${
          focused
            ? "-top-2 text-xs text-gold bg-surface px-1"
            : "top-2.5 text-sm text-white/40"
        }`}
      >
        {label}
      </label>
      <div onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}>
        {children}
      </div>
    </div>
  );
}
