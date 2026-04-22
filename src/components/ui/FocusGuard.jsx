import { useRef, useEffect } from "react";

export default function FocusGuard({ children, active = true, initialFocus }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const focusable = containerRef.current?.querySelectorAll(
      'a,button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])'
    ) ?? [];
    const el = initialFocus
      ? containerRef.current?.querySelector(initialFocus)
      : focusable[0];
    el?.focus();
  }, [active, initialFocus]);

  return <div ref={containerRef}>{children}</div>;
}
