export default function LabelledSection({ id, title, description, children, className = "" }) {
  return (
    <section aria-labelledby={`${id}-heading`} className={className}>
      <div className="mb-4">
        <h2 id={`${id}-heading`} className="text-sm font-semibold text-white/70">{title}</h2>
        {description && <p className="text-xs text-white/35 mt-0.5">{description}</p>}
      </div>
      {children}
    </section>
  );
}
