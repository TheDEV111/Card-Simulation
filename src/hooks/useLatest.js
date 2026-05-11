import { useRef, useLayoutEffect } from "react";

export function useLatest(value) {
  const ref = useRef(value);
  useLayoutEffect(() => { ref.current = value; });
  return ref;
}
