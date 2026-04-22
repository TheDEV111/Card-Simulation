export default function ResponsiveGrid({ children, minWidth = 280, gap = 4, className = "" }) {
  return (
    <div
      className={`grid gap-${gap} ${className}`}
      style={{ gridTemplateColumns: `repeat(auto-fit, minmax(${minWidth}px, 1fr))` }}
    >
      {children}
    </div>
  );
}
