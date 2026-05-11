import { useState, useCallback } from "react";

export function useCounter(initial = 0, { min = -Infinity, max = Infinity, step = 1 } = {}) {
  const [count, setCount] = useState(initial);

  const increment = useCallback(() => setCount((c) => Math.min(max, c + step)), [max, step]);
  const decrement = useCallback(() => setCount((c) => Math.max(min, c - step)), [min, step]);
  const reset     = useCallback(() => setCount(initial), [initial]);
  const set       = useCallback((v) => setCount(Math.max(min, Math.min(max, v))), [min, max]);

  return { count, increment, decrement, reset, set };
}
