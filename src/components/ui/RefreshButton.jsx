import { useState } from "react";

export default function RefreshButton({ onRefresh, label = "Refresh", className = "" }) {
  const [spinning, setSpinning] = useState(false);

  async function handleClick() {
    if (spinning) return;
    setSpinning(true);
    try {
      await onRefresh?.();
    } finally {
      setTimeout(() => setSpinning(false), 500);
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={spinning}
      className={`inline-flex items-center gap-2 rounded-xl px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200 transition-colors ${className}`}
    >
      <svg className={`h-4 w-4 ${spinning ? "animate-spin" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
      </svg>
      {label}
    </button>
  );
}
