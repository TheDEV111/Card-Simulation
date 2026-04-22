import { useEffect, useRef, useState } from "react";

export default function NumberTicker({ value, format = (v) => Math.round(v).toLocaleString(), className = "" }) {
  const [display, setDisplay] = useState(value);
  const prev = useRef(value);

  useEffect(() => {
    const from = prev.current;
    const to   = value;
    prev.current = value;
    if (from === to) return;

    const start = performance.now();
    const dur   = 600;
    const ease  = (t) => 1 - Math.pow(1 - t, 3);

    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1);
      setDisplay(from + (to - from) * ease(t));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [value]);

  return <span className={`tabular-nums ${className}`}>{format(display)}</span>;
}
