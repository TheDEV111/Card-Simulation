import { formatSTX } from "../../utils/currency";

export default function GasEstimate({ fee, label = "Estimated Fee", breakdown, className = "" }) {
  return (
    <div className={`rounded-xl bg-gray-50 p-3 dark:bg-gray-800/50 ${className}`}>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 dark:text-gray-400">{label}</span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">
          {formatSTX(fee)} <span className="text-xs text-gray-400">STX</span>
        </span>
      </div>
      {breakdown && (
        <div className="mt-2 space-y-1">
          {Object.entries(breakdown).map(([k, v]) => (
            <div key={k} className="flex justify-between text-xs text-gray-400">
              <span>{k}</span>
              <span>{typeof v === "bigint" ? formatSTX(v) : v}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
