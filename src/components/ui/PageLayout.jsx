export default function PageLayout({ title, description, actions, children, breadcrumb, className = "" }) {
  return (
    <div className={`mx-auto max-w-7xl space-y-6 ${className}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          {breadcrumb && <div className="mb-1">{breadcrumb}</div>}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
          {description && <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{description}</p>}
        </div>
        {actions && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
      </div>
      {children}
    </div>
  );
}
