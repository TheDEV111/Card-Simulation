import { useState, useCallback } from "react";

export function useStep(steps) {
  const total = Array.isArray(steps) ? steps.length : steps;
  const [index, setIndex] = useState(0);

  const next     = useCallback(() => setIndex((i) => Math.min(i + 1, total - 1)), [total]);
  const prev     = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), []);
  const goTo     = useCallback((i) => setIndex(Math.max(0, Math.min(i, total - 1))), [total]);
  const reset    = useCallback(() => setIndex(0), []);
  const isFirst  = index === 0;
  const isLast   = index === total - 1;
  const step     = Array.isArray(steps) ? steps[index] : index;

  return { index, step, next, prev, goTo, reset, isFirst, isLast, total };
}
