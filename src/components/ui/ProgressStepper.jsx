export default function ProgressStepper({ steps = [], currentStep = 0, className = "" }) {
  return (
    <nav className={`flex items-center ${className}`} aria-label="Progress">
      {steps.map((step, i) => {
        const done = i < currentStep;
        const active = i === currentStep;
        return (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold transition-colors ${
                  done
                    ? "bg-indigo-600 text-white"
                    : active
                    ? "bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/40"
                    : "bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                }`}
              >
                {done ? "✓" : i + 1}
              </div>
              <span
                className={`whitespace-nowrap text-xs ${
                  active ? "font-medium text-indigo-600 dark:text-indigo-400" : "text-gray-400"
                }`}
              >
                {step}
              </span>
            </div>
            {i < steps.length - 1 && (
              <div className={`mx-2 mb-5 h-px flex-1 ${done ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`} />
            )}
          </div>
        );
      })}
    </nav>
  );
}
