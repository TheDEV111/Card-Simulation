import { useState, useCallback } from "react";

export function useAccordion({ multiple = false, defaultOpen = [] } = {}) {
  const [open, setOpen] = useState(new Set(defaultOpen));

  const toggle = useCallback((id) => {
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        if (!multiple) next.clear();
        next.add(id);
      }
      return next;
    });
  }, [multiple]);

  const isOpen = useCallback((id) => open.has(id), [open]);
  const openAll = useCallback((ids) => setOpen(new Set(ids)), []);
  const closeAll = useCallback(() => setOpen(new Set()), []);

  return { open, toggle, isOpen, openAll, closeAll };
}
