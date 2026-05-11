import { useRef, useMemo } from "react";
import { deepEqual } from "../utils/diff";

export function useDeepMemo(factory, deps) {
  const prevDepsRef = useRef(null);
  const prevResultRef = useRef(null);

  const depsChanged =
    prevDepsRef.current === null ||
    deps.some((dep, i) => !deepEqual(dep, prevDepsRef.current[i]));

  if (depsChanged) {
    prevDepsRef.current = deps;
    prevResultRef.current = factory();
  }

  return prevResultRef.current;
}

export function useDeepCallback(fn, deps) {
  return useDeepMemo(() => fn, deps);
}

export function useShallowMemo(value) {
  const ref = useRef(value);
  return useMemo(() => {
    if (Object.is(ref.current, value)) return ref.current;
    const prevKeys = Object.keys(ref.current);
    const nextKeys = Object.keys(value);
    const changed =
      prevKeys.length !== nextKeys.length ||
      prevKeys.some((k) => !Object.is(ref.current[k], value[k]));
    if (changed) ref.current = value;
    return ref.current;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
