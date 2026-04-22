import { useRef } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function FadeSlide({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, visible] = useScrollReveal(0.1);

  const transforms = {
    up:    visible ? "translateY(0)"   : "translateY(20px)",
    down:  visible ? "translateY(0)"   : "translateY(-20px)",
    left:  visible ? "translateX(0)"   : "translateX(20px)",
    right: visible ? "translateX(0)"   : "translateX(-20px)",
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  transforms[direction] ?? transforms.up,
        transition: `opacity 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.6s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
