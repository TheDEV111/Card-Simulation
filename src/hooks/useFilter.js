import { useState, useMemo, useCallback } from "react";

export function useFilter(items, filterFns = {}) {
  const [active, setActive] = useState({});

  const filtered = useMemo(() => {
    return items.filter((item) =>
      Object.entries(active).every(([key, value]) => {
        if (value == null || value === "all" || value === "") return true;
        const fn = filterFns[key];
        return fn ? fn(item, value) : item[key] === value;
      })
    );
  }, [items, active]);

  const set    = useCallback((key, value) => setActive((a) => ({ ...a, [key]: value })), []);
  const unset  = useCallback((key) => setActive((a) => { const n = { ...a }; delete n[key]; return n; }), []);
  const reset  = useCallback(() => setActive({}), []);

  return { active, filtered, set, unset, reset };
}
