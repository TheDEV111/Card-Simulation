import { useState, useEffect } from "react";

export default function CountdownTimer({ targetMs, onExpire, className = "" }) {
  const [remaining, setRemaining] = useState(Math.max(0, targetMs - Date.now()));

  useEffect(() => {
    if (remaining <= 0) { onExpire?.(); return; }
    const id = setInterval(() => {
      setRemaining((r) => {
        const next = r - 1000;
        if (next <= 0) { clearInterval(id); onExpire?.(); return 0; }
        return next;
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const h = Math.floor(remaining / 3_600_000);
  const m = Math.floor((remaining % 3_600_000) / 60_000);
  const s = Math.floor((remaining % 60_000) / 1000);
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <span className={`font-mono tabular-nums ${className}`}>
      {h > 0 && `${pad(h)}:`}{pad(m)}:{pad(s)}
    </span>
  );
}
