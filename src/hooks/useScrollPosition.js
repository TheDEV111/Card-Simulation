import { useState, useEffect } from "react";
import { throttle } from "../utils/perf";

export function useScrollPosition() {
  const [pos, setPos] = useState({ x: window.scrollX, y: window.scrollY });

  useEffect(() => {
    const handler = throttle(() => setPos({ x: window.scrollX, y: window.scrollY }), 100);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return pos;
}
