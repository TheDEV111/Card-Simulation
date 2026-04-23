export default function ChartContainer({ title, subtitle, legend, children, className = "" }) {
  return (
    <div className={`panel p-5 space-y-3 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div>
          {title && <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">{title}</h3>}
          {subtitle && <p className="text-xs text-white/25 mt-0.5">{subtitle}</p>}
        </div>
        {legend}
      </div>
      {children}
    </div>
  );
}
