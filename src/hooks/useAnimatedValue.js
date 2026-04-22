import { useRef, useEffect, useState } from "react";

export function useAnimatedValue(target, duration = 800) {
  const [value, setValue] = useState(0);
  const startRef = useRef(null);
  const fromRef  = useRef(0);

  useEffect(() => {
    fromRef.current = value;
    startRef.current = null;
    const easeOut = (t) => 1 - Math.pow(1 - t, 4);

    const tick = (ts) => {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      const current = fromRef.current + (target - fromRef.current) * easeOut(progress);
      setValue(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return value;
}
