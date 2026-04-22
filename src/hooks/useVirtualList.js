import { useState, useCallback, useRef } from "react";

export function useVirtualList(items, rowHeight, containerHeight) {
  const [scrollTop, setScrollTop] = useState(0);
  const totalHeight = items.length * rowHeight;
  const visibleCount = Math.ceil(containerHeight / rowHeight) + 2;
  const startIndex  = Math.max(0, Math.floor(scrollTop / rowHeight) - 1);
  const endIndex    = Math.min(items.length - 1, startIndex + visibleCount);
  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, i) => ({
    item,
    index: startIndex + i,
    style: { position: "absolute", top: (startIndex + i) * rowHeight, height: rowHeight, left: 0, right: 0 },
  }));

  const onScroll = useCallback((e) => setScrollTop(e.currentTarget.scrollTop), []);

  return { visibleItems, totalHeight, onScroll };
}
