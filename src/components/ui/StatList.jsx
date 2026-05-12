export default function StatList({ stats = [], columns = 2, className = "" }) {
  const colClass = { 1: "grid-cols-1", 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-4" }[columns] ?? "grid-cols-2";
  return (
    <dl className={`grid gap-px overflow-hidden rounded-2xl bg-gray-200 ring-1 ring-gray-200 dark:bg-gray-700 dark:ring-gray-700 ${colClass} ${className}`}>
      {stats.map(({ label, value, sub, icon }) => (
        <div key={label} className="flex flex-col gap-1 bg-white px-5 py-4 dark:bg-gray-900">
          <dt className="flex items-center gap-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            {icon && <span>{icon}</span>}
            {label}
          </dt>
          <dd className="text-2xl font-bold tabular-nums text-gray-900 dark:text-white">{value}</dd>
          {sub && <p className="text-xs text-gray-400">{sub}</p>}
        </div>
      ))}
    </dl>
  );
}
