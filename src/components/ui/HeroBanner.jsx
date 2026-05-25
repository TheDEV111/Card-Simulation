export default function HeroBanner({ eyebrow, title, subtitle, actions, image, className = "" }) {
  return (
    <section className={`relative overflow-hidden ${className}`}>
      <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
        <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:gap-12">
          <div className="flex-1">
            {eyebrow && (
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">{eyebrow}</p>
            )}
            <h1 className="text-4xl font-extrabold leading-tight text-gray-900 dark:text-white sm:text-5xl">
              {title}
            </h1>
            {subtitle && (
              <p className="mt-4 text-lg text-gray-500 dark:text-gray-400 max-w-xl">{subtitle}</p>
            )}
            {actions && (
              <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
            )}
          </div>
          {image && (
            <div className="lg:flex-1">{image}</div>
          )}
        </div>
      </div>
    </section>
  );
}
