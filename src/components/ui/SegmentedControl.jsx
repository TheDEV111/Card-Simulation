export default function SegmentedControl({ options = [], value, onChange, className = "" }) {
  return (
    <div
      className={`inline-flex rounded-lg bg-gray-100 p-0.5 dark:bg-gray-800 ${className}`}
      role="tablist"
    >
      {options.map((opt) => {
        const isActive = (opt.value ?? opt) === value;
        const label = opt.label ?? opt;
        const val = opt.value ?? opt;
        return (
          <button
            key={val}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange?.(val)}
            className={`relative rounded-md px-3 py-1.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-white"
                : "text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            }`}
          >
            {opt.icon && <span className="mr-1.5">{opt.icon}</span>}
            {label}
          </button>
        );
      })}
    </div>
  );
}
