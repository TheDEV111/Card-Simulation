import { useRef, useCallback } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function CardShine({ children, className = "" }) {
  const ref  = useRef(null);
  const reduced = useReducedMotion();

  const handleMouseMove = useCallback((e) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20;
    ref.current.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg)`;
    ref.current.style.transition = "transform 0.1s ease";
  }, [reduced]);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "perspective(600px) rotateX(0) rotateY(0)";
    ref.current.style.transition = "transform 0.5s cubic-bezier(0.16,1,0.3,1)";
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
