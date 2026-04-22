import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Marquee({ items = [], speed = 30, separator = "·", className = "" }) {
  const reduced = useReducedMotion();
  const content = items.join(`  ${separator}  `);
  const duration = `${content.length / speed}s`;

  if (reduced) {
    return (
      <div className={`overflow-hidden text-xs text-white/30 ${className}`}>
        {content}
      </div>
    );
  }

  return (
    <div className={`overflow-hidden ${className}`} aria-hidden="true">
      <div
        className="flex gap-8 whitespace-nowrap text-xs text-white/30"
        style={{ animation: `marquee ${duration} linear infinite` }}
      >
        <span>{content}</span>
        <span aria-hidden="true">{content}</span>
      </div>
    </div>
  );
}
