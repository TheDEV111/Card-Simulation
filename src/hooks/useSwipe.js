import { useRef } from "react";

export function useSwipe({ onLeft, onRight, onUp, onDown, threshold = 50 } = {}) {
  const startRef = useRef(null);

  const onTouchStart = (e) => {
    startRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  const onTouchEnd = (e) => {
    if (!startRef.current) return;
    const dx = e.changedTouches[0].clientX - startRef.current.x;
    const dy = e.changedTouches[0].clientY - startRef.current.y;
    startRef.current = null;

    if (Math.abs(dx) > Math.abs(dy)) {
      if (dx > threshold) onRight?.();
      else if (dx < -threshold) onLeft?.();
    } else {
      if (dy > threshold) onDown?.();
      else if (dy < -threshold) onUp?.();
    }
  };

  return { onTouchStart, onTouchEnd };
}
