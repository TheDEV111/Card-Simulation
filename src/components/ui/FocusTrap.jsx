import { useRef, useEffect } from "react";

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

export default function FocusTrap({ children, enabled = true }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const focusable = [...el.querySelectorAll(FOCUSABLE)];
    if (!focusable.length) return;

    focusable[0]?.focus();

    const handler = (e) => {
      if (e.key !== "Tab") return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
        e.preventDefault();
        (e.shiftKey ? last : first)?.focus();
      }
    };

    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [enabled]);

  return <div ref={ref}>{children}</div>;
}
