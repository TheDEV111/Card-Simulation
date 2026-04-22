import { useScrollReveal } from "../../hooks/useScrollReveal";

export default function StaggerGroup({ children, baseDelay = 0, step = 80, className = "" }) {
  const [ref, visible] = useScrollReveal(0.05);

  return (
    <div ref={ref} className={className}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <div
              key={i}
              style={{
                opacity:    visible ? 1 : 0,
                transform:  visible ? "translateY(0)" : "translateY(16px)",
                transition: `opacity 0.55s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * step}ms, transform 0.55s cubic-bezier(0.16,1,0.3,1) ${baseDelay + i * step}ms`,
              }}
            >
              {child}
            </div>
          ))
        : children}
    </div>
  );
}
