import { useState, useRef, useCallback } from "react";
import { clamp } from "../../utils/math";

export default function SplitPane({
  children,
  direction = "horizontal",
  defaultSplit = 50,
  min = 20,
  max = 80,
  className = "",
}) {
  const [split, setSplit] = useState(defaultSplit);
  const containerRef = useRef(null);
  const dragging = useRef(false);

  const onMouseDown = useCallback(() => { dragging.current = true; }, []);

  const onMouseMove = useCallback((e) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = direction === "horizontal"
      ? ((e.clientX - rect.left) / rect.width) * 100
      : ((e.clientY - rect.top) / rect.height) * 100;
    setSplit(clamp(pct, min, max));
  }, [direction, min, max]);

  const onMouseUp = useCallback(() => { dragging.current = false; }, []);

  const [a, b] = Array.isArray(children) ? children : [children, null];
  const isH = direction === "horizontal";

  return (
    <div
      ref={containerRef}
      className={`relative flex ${isH ? "flex-row" : "flex-col"} overflow-hidden ${className}`}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
    >
      <div style={{ [isH ? "width" : "height"]: `${split}%` }} className="overflow-auto">{a}</div>
      <div
        className={`shrink-0 ${isH ? "cursor-col-resize w-1" : "cursor-row-resize h-1"} bg-gray-200 hover:bg-indigo-400 dark:bg-gray-700 transition-colors`}
        onMouseDown={onMouseDown}
      />
      <div className="flex-1 overflow-auto">{b}</div>
    </div>
  );
}
