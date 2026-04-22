import { useRef, useEffect } from "react";

export function useMemoCompare(value, compare) {
  const ref = useRef(value);
  const prev = ref.current;
  const equal = compare(prev, value);
  useEffect(() => { if (!equal) ref.current = value; });
  return equal ? prev : value;
}
