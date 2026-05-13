export default function MiniTable({ headers = [], rows = [], className = "" }) {
  return (
    <table className={`min-w-full text-sm ${className}`}>
      {headers.length > 0 && (
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className={`py-2 text-xs font-semibold uppercase tracking-wide text-gray-400 ${i === 0 ? "pr-4 text-left" : "px-4 text-right"}`}>{h}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
        {rows.map((row, ri) => (
          <tr key={ri}>
            {row.map((cell, ci) => (
              <td key={ci} className={`py-2.5 ${ci === 0 ? "pr-4 text-left font-medium text-gray-700 dark:text-gray-300" : "px-4 text-right tabular-nums text-gray-600 dark:text-gray-400"}`}>
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
