import { useState, useRef, useEffect } from "react";

export function useContainerWidth() {
  const ref   = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });
    obs.observe(ref.current);
    setWidth(ref.current.offsetWidth);
    return () => obs.disconnect();
  }, []);

  return [ref, width];
}
