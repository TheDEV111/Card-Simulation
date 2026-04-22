export default function SettingsRow({ label, description, children, htmlFor }) {
  return (
    <div className="flex items-center justify-between gap-6 py-2">
      <div className="min-w-0">
        {htmlFor ? (
          <label htmlFor={htmlFor} className="text-sm text-white/70 cursor-pointer">{label}</label>
        ) : (
          <span className="text-sm text-white/70">{label}</span>
        )}
        {description && <p className="text-xs text-white/30 mt-0.5">{description}</p>}
      </div>
      <div className="flex-shrink-0">{children}</div>
    </div>
  );
}
