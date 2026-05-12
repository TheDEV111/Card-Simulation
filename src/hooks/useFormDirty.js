import { useState, useCallback, useRef } from "react";

export function useFormDirty(initialValues = {}) {
  const baseRef = useRef(JSON.stringify(initialValues));
  const [current, setCurrent] = useState(initialValues);

  const isDirty = JSON.stringify(current) !== baseRef.current;

  const update = useCallback((patch) => {
    setCurrent((prev) => (typeof patch === "function" ? patch(prev) : { ...prev, ...patch }));
  }, []);

  const reset = useCallback((values) => {
    const next = values ?? JSON.parse(baseRef.current);
    setCurrent(next);
  }, []);

  const commit = useCallback(() => {
    baseRef.current = JSON.stringify(current);
  }, [current]);

  const getDirtyFields = useCallback(() => {
    const base = JSON.parse(baseRef.current);
    return Object.keys(current).filter((k) => JSON.stringify(current[k]) !== JSON.stringify(base[k]));
  }, [current]);

  return { values: current, isDirty, update, reset, commit, getDirtyFields };
}
