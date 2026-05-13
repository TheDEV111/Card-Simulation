import { useState } from "react";

export default function LikeButton({ initialCount = 0, initialLiked = false, onToggle, className = "" }) {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  function toggle() {
    const next = !liked;
    setLiked(next);
    setCount((c) => next ? c + 1 : c - 1);
    onToggle?.(next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`group inline-flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-sm font-medium transition-all ${liked ? "bg-red-50 text-red-500 dark:bg-red-900/20" : "text-gray-400 hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"} ${className}`}
    >
      <svg
        className={`h-4 w-4 transition-transform ${liked ? "scale-125" : "group-hover:scale-110"}`}
        fill={liked ? "currentColor" : "none"}
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
      </svg>
      <span className="tabular-nums">{count}</span>
    </button>
  );
}
