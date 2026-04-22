import { useScrollReveal } from "../../hooks/useScrollReveal";
import { useScrollProgress } from "../../hooks/useScrollProgress";

export default function StickyHeader({ children, className = "" }) {
  const scrolled = useScrollProgress() > 0.01;

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-surface/90 backdrop-blur-md border-b border-white/5 shadow-lg"
          : "bg-transparent border-b border-transparent"
      } ${className}`}
    >
      {children}
    </header>
  );
}
