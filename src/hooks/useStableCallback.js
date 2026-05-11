import { useCallback, useRef, useLayoutEffect } from "react";

export function useStableCallback(fn) {
  const ref = useRef(fn);
  useLayoutEffect(() => { ref.current = fn; });
  return useCallback((...args) => ref.current(...args), []);
}
