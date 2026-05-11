import { useState, useEffect, useRef, useCallback } from "react";

export function useResizeObserver() {
  const ref = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize({ width, height });
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, ...size };
}

export function useContainerQuery(breakpoints) {
  const { ref, width } = useResizeObserver();

  const match = useCallback(
    (bp) => width >= (breakpoints[bp] ?? 0),
    [width, breakpoints]
  );

  return { ref, width, match };
}
