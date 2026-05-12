export default function ProgressLabel({ value = 0, max = 100, label, showPercent = true, color = "bg-indigo-500", className = "" }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className={className}>
      <div className="mb-1 flex items-center justify-between">
        {label && <span className="text-sm text-gray-600 dark:text-gray-400">{label}</span>}
        {showPercent && <span className="text-sm font-semibold text-gray-900 dark:text-white">{pct}%</span>}
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
        <div
          className={`h-full rounded-full transition-all duration-500 ${color}`}
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        />
      </div>
    </div>
  );
}
