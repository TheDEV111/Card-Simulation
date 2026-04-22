export default function FormSection({ title, description, children, className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      {(title || description) && (
        <div className="space-y-0.5">
          {title && <h3 className="text-sm font-semibold text-white/70">{title}</h3>}
          {description && <p className="text-xs text-white/30">{description}</p>}
        </div>
      )}
      <div className="space-y-3">{children}</div>
    </div>
  );
}
