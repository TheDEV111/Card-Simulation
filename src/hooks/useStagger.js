import { useMemo } from "react";

export function useStagger(count, { delay = 50, base = 0 } = {}) {
  return useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        style: { transitionDelay: `${base + i * delay}ms` },
        delay: base + i * delay,
      })),
    [count, delay, base]
  );
}

export function staggerStyle(index, delay = 50, base = 0) {
  return { transitionDelay: `${base + index * delay}ms` };
}
