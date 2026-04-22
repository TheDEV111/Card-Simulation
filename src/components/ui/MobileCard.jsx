export default function MobileCard({ header, footer, children, className = "" }) {
  return (
    <div className={`panel overflow-hidden ${className}`}>
      {header && (
        <div className="px-4 py-3 border-b border-white/5 flex items-center justify-between">
          {header}
        </div>
      )}
      <div className="px-4 py-4">{children}</div>
      {footer && (
        <div className="px-4 py-3 border-t border-white/5 flex items-center justify-between">
          {footer}
        </div>
      )}
    </div>
  );
}
