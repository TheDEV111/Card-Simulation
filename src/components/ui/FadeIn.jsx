import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle } from "../../utils/animation";

export default function FadeIn({ children, delay = 0, threshold = 0.1, className = "" }) {
  const [ref, visible] = useScrollReveal({ threshold });

  return (
    <div ref={ref} className={className} style={fadeInUpStyle(visible, delay)}>
      {children}
    </div>
  );
}
