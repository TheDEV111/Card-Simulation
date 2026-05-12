export default function PricingCard({ name, price, period = "mo", description, features = [], cta, highlighted = false, className = "" }) {
  return (
    <div className={`relative flex flex-col rounded-2xl p-6 ${highlighted ? "bg-indigo-600 text-white shadow-2xl shadow-indigo-200 dark:shadow-indigo-900/40" : "bg-white ring-1 ring-gray-200 dark:bg-gray-900 dark:ring-gray-700"} ${className}`}>
      {highlighted && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-0.5 text-xs font-semibold text-gray-900">
          Most Popular
        </span>
      )}
      <p className={`text-sm font-semibold ${highlighted ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"}`}>{name}</p>
      <div className="mt-3 flex items-end gap-1">
        <span className={`text-4xl font-bold ${highlighted ? "text-white" : "text-gray-900 dark:text-white"}`}>{price}</span>
        <span className={`mb-1 text-sm ${highlighted ? "text-indigo-200" : "text-gray-400"}`}>/{period}</span>
      </div>
      {description && <p className={`mt-2 text-sm ${highlighted ? "text-indigo-100" : "text-gray-500 dark:text-gray-400"}`}>{description}</p>}
      <ul className="mt-5 space-y-2.5 flex-1">
        {features.map((f) => (
          <li key={f} className={`flex items-center gap-2 text-sm ${highlighted ? "text-indigo-50" : "text-gray-600 dark:text-gray-300"}`}>
            <span className={highlighted ? "text-indigo-200" : "text-green-500"}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      {cta && <div className="mt-6">{cta}</div>}
    </div>
  );
}
