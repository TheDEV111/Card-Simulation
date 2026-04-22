import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function Reveal({ children, delay = 0, once = true, className = "" }) {
  const [ref, visible] = useScrollReveal(0.1);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "none" : "translateY(12px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}
