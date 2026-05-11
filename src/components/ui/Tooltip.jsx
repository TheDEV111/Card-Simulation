import { useState, useRef } from "react";

export default function Tooltip({ content, placement = "top", delay = 300, children, className = "" }) {
  const [visible, setVisible] = useState(false);
  const timerRef = useRef(null);

  function show() {
    timerRef.current = setTimeout(() => setVisible(true), delay);
  }
  function hide() {
    clearTimeout(timerRef.current);
    setVisible(false);
  }

  const positions = {
    top:    "bottom-full left-1/2 -translate-x-1/2 mb-2",
    bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
    left:   "right-full top-1/2 -translate-y-1/2 mr-2",
    right:  "left-full top-1/2 -translate-y-1/2 ml-2",
  };

  return (
    <span
      className={`relative inline-flex ${className}`}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
    >
      {children}
      {visible && content && (
        <span
          className={`pointer-events-none absolute z-50 whitespace-nowrap rounded-lg bg-gray-900 px-3 py-1.5 text-xs text-white shadow-lg dark:bg-gray-700 ${positions[placement] ?? positions.top}`}
          role="tooltip"
        >
          {content}
        </span>
      )}
    </span>
  );
}
