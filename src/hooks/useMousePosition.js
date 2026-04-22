import { useState, useEffect } from "react";

export function useMousePosition(ref) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref?.current ?? window;
    const handler = (e) => setPos({ x: e.clientX, y: e.clientY });
    el.addEventListener("mousemove", handler);
    return () => el.removeEventListener("mousemove", handler);
  }, [ref]);

  return pos;
}
