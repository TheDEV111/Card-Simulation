import { useRef, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Spotlight({ children, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();

  const handleMouseMove = useCallback((e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty("--x", `${x}px`);
    ref.current.style.setProperty("--y", `${y}px`);
  }, [reduced]);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      className={`relative overflow-hidden ${className}`}
      style={{
        background: reduced
          ? undefined
          : "radial-gradient(300px circle at var(--x, 50%) var(--y, 50%), rgba(212,175,55,0.06), transparent 70%)",
      }}
    >
      {children}
    </div>
  );
}
