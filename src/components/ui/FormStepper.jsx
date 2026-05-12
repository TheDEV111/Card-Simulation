import { useState } from "react";
import { useStep } from "../../hooks/useStep";

export default function FormStepper({ steps = [], onComplete, className = "" }) {
  const { index, next, prev, isFirst, isLast, total } = useStep(steps);
  const [data, setData] = useState({});

  const step = steps[index];
  if (!step) return null;

  function handleNext(values) {
    const merged = { ...data, ...values };
    setData(merged);
    if (isLast) onComplete?.(merged);
    else next();
  }

  return (
    <div className={className}>
      <div className="mb-6 flex items-center gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-1 items-center gap-2 last:flex-none">
            <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${i < index ? "bg-indigo-600 text-white" : i === index ? "bg-indigo-600 text-white ring-4 ring-indigo-100 dark:ring-indigo-900/40" : "bg-gray-100 text-gray-400 dark:bg-gray-800"}`}>
              {i < index ? "✓" : i + 1}
            </div>
            <span className={`hidden text-xs sm:block ${i === index ? "font-medium text-indigo-600 dark:text-indigo-400" : "text-gray-400"}`}>{s.label}</span>
            {i < total - 1 && <div className={`h-px flex-1 ${i < index ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"}`} />}
          </div>
        ))}
      </div>
      <step.component data={data} onNext={handleNext} onBack={prev} isFirst={isFirst} isLast={isLast} />
    </div>
  );
}
