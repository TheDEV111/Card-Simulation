import { useState, useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

export function useFlicker(interval = 4000, flickerMs = 120) {
  const [dim, setDim] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const outer = setInterval(() => {
      setDim(true);
      setTimeout(() => setDim(false), flickerMs);
    }, interval + Math.random() * interval);
    return () => clearInterval(outer);
  }, [interval, flickerMs, reduced]);

  return dim;
}
