export default function ComparisonTable({ columns = [], rows = [], className = "" }) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-3 pr-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-400" />
            {columns.map((col) => (
              <th key={col.key} className={`px-4 py-3 text-center text-sm font-semibold ${col.highlighted ? "text-indigo-600 dark:text-indigo-400" : "text-gray-900 dark:text-white"}`}>
                {col.label}
                {col.highlighted && <span className="ml-1 rounded-full bg-indigo-100 px-1.5 py-0.5 text-xs dark:bg-indigo-900/40">★</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {rows.map((row, ri) => (
            <tr key={ri}>
              <td className="py-3 pr-4 text-sm font-medium text-gray-700 dark:text-gray-300">{row.label}</td>
              {columns.map((col) => {
                const v = row[col.key];
                return (
                  <td key={col.key} className="px-4 py-3 text-center text-sm text-gray-600 dark:text-gray-400">
                    {v === true ? <span className="text-green-500">✓</span> : v === false ? <span className="text-gray-300">–</span> : v}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
