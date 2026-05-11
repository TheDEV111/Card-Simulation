import { useState, useCallback } from "react";

export function useSelection({ multiple = true, initial = [] } = {}) {
  const [selected, setSelected] = useState(new Set(initial));

  const select = useCallback((id) => {
    setSelected((prev) => {
      if (!multiple) return new Set([id]);
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, [multiple]);

  const deselect = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }, []);

  const toggle = useCallback((id) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else { if (!multiple) next.clear(); next.add(id); }
      return next;
    });
  }, [multiple]);

  const selectAll = useCallback((ids) => setSelected(new Set(ids)), []);
  const clear = useCallback(() => setSelected(new Set()), []);
  const isSelected = useCallback((id) => selected.has(id), [selected]);

  return {
    selected,
    selectedArray: [...selected],
    count: selected.size,
    select, deselect, toggle, selectAll, clear, isSelected,
  };
}
