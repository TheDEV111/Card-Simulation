import { useState } from "react";
import { sortBy } from "../../utils/sort";

export default function DataGrid({ columns = [], rows = [], className = "" }) {
  const [sortKey, setSortKey] = useState(null);
  const [direction, setDirection] = useState("asc");

  function handleSort(col) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setDirection("asc");
    }
  }

  const sorted = sortKey ? sortBy(rows, sortKey, direction) : rows;

  return (
    <div className={`overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 ${className}`}>
      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
        <thead className="bg-gray-50 dark:bg-gray-800/50">
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={`px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 ${col.sortable ? "cursor-pointer select-none hover:text-gray-700 dark:hover:text-gray-200" : ""}`}
              >
                <span className="flex items-center gap-1">
                  {col.label}
                  {col.sortable && sortKey === col.key && (
                    <span>{direction === "asc" ? "↑" : "↓"}</span>
                  )}
                </span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {sorted.map((row, ri) => (
            <tr key={ri} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
          {sorted.length === 0 && (
            <tr>
              <td colSpan={columns.length} className="px-4 py-10 text-center text-sm text-gray-400">
                No data
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
