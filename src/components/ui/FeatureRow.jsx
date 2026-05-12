export default function FeatureRow({ icon, title, description, reverse = false, visual, className = "" }) {
  return (
    <div className={`flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-16 ${reverse ? "lg:flex-row-reverse" : ""} ${className}`}>
      <div className="flex-1">
        {icon && (
          <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-100 text-2xl dark:bg-indigo-900/30">
            {icon}
          </div>
        )}
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h2>
        <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-md">{description}</p>
      </div>
      {visual && <div className="flex-1">{visual}</div>}
    </div>
  );
}
