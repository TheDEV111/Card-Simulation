import { useState } from "react";
import SmartPagination from "./SmartPagination";

export default function DataTable({ columns, rows, pageSize = 10, className = "" }) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(rows.length / pageSize);
  const paged = rows.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className={className}>
      <div className="overflow-x-auto rounded-xl border border-white/8">
        <table className="w-full" role="table">
          <thead>
            <tr className="border-b border-white/8">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-xs font-semibold text-white/35 uppercase tracking-wider ${col.align === "right" ? "text-right" : "text-left"}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {paged.map((row, ri) => (
              <tr key={ri} className="hover:bg-white/3 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-4 py-3 text-sm ${col.align === "right" ? "text-right" : ""}`}>
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {totalPages > 1 && (
        <div className="mt-4">
          <SmartPagination page={page} totalPages={totalPages} onPage={setPage} />
        </div>
      )}
    </div>
  );
}
