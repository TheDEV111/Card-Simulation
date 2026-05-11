import { useState, useCallback } from "react";

export function useTabState(tabs, { defaultIndex = 0 } = {}) {
  const [activeIndex, setActiveIndex] = useState(defaultIndex);

  const activeTab = tabs[activeIndex] ?? tabs[0];

  const select = useCallback((indexOrId) => {
    if (typeof indexOrId === "number") {
      setActiveIndex(indexOrId);
    } else {
      const idx = tabs.findIndex((t) => (t.id ?? t) === indexOrId);
      if (idx !== -1) setActiveIndex(idx);
    }
  }, [tabs]);

  const next = useCallback(() =>
    setActiveIndex((i) => Math.min(i + 1, tabs.length - 1)), [tabs.length]);

  const prev = useCallback(() =>
    setActiveIndex((i) => Math.max(i - 1, 0)), []);

  return { activeIndex, activeTab, select, next, prev, tabs };
}
