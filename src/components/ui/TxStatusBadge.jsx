const CONFIG = {
  pending:   { label: "Pending",   color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300",   dot: "bg-amber-400 animate-pulse" },
  success:   { label: "Confirmed", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300",   dot: "bg-green-500" },
  failed:    { label: "Failed",    color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",           dot: "bg-red-500" },
  aborted:   { label: "Aborted",  color: "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400",          dot: "bg-gray-400" },
  broadcast: { label: "Broadcast", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300",      dot: "bg-blue-400 animate-ping" },
};

export default function TxStatusBadge({ status, className = "" }) {
  const c = CONFIG[status] ?? CONFIG.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${c.color} ${className}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {c.label}
    </span>
  );
}
