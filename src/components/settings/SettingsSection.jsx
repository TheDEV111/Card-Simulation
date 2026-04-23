export default function SettingsSection({ title, description, children, className = "" }) {
  return (
    <section className={`space-y-4 ${className}`}>
      <div className="border-b border-white/8 pb-3">
        <h2 className="text-sm font-semibold text-white/80">{title}</h2>
        {description && <p className="text-xs text-white/40 mt-0.5">{description}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
