import { useState } from "react";

export function BookmarkButton({ initialSaved = false, initialCount = 0, onToggle, showCount = true }) {
  const [saved, setSaved] = useState(initialSaved);
  const [count, setCount] = useState(initialCount);

  const toggle = () => {
    const next = !saved;
    setSaved(next);
    setCount((c) => (next ? c + 1 : Math.max(0, c - 1)));
    onToggle?.(next);
  };

  return (
    <button
      onClick={toggle}
      aria-label={saved ? "Remove bookmark" : "Bookmark"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
        saved
          ? "text-amber-700 bg-amber-50 hover:bg-amber-100"
          : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
      }`}
    >
      <svg
        className="w-4 h-4"
        fill={saved ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
        />
      </svg>
      {showCount && <span className="tabular-nums">{count}</span>}
    </button>
  );
}
