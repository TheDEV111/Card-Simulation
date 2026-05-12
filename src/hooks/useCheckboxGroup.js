import { useState, useCallback } from "react";

export function useCheckboxGroup(initial = []) {
  const [checked, setChecked] = useState(new Set(initial));

  const toggle = useCallback((value) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      return next;
    });
  }, []);

  const check = useCallback((value) => setChecked((p) => new Set([...p, value])), []);
  const uncheck = useCallback((value) => setChecked((p) => { const n = new Set(p); n.delete(value); return n; }), []);
  const checkAll = useCallback((values) => setChecked(new Set(values)), []);
  const uncheckAll = useCallback(() => setChecked(new Set()), []);
  const isChecked = useCallback((value) => checked.has(value), [checked]);

  return { checked, values: [...checked], toggle, check, uncheck, checkAll, uncheckAll, isChecked };
}
