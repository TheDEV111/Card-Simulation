import { useState, useEffect, useRef } from "react";

export default function GameAutoPlay({ onPlay, card, stake, className = "" }) {
  const [active, setActive]   = useState(false);
  const [count, setCount]     = useState(5);
  const [remaining, setRemain] = useState(count);
  const intervalRef = useRef(null);

  const toggleAutoPlay = () => {
    if (active) { clearInterval(intervalRef.current); setActive(false); setRemain(count); }
    else { setActive(true); setRemain(count); }
  };

  useEffect(() => {
    if (!active) return;
    intervalRef.current = setInterval(() => {
      if (!card || !stake) { setActive(false); return; }
      setRemain((r) => {
        if (r <= 1) { setActive(false); clearInterval(intervalRef.current); return count; }
        onPlay?.(card, stake);
        return r - 1;
      });
    }, 3000);
    return () => clearInterval(intervalRef.current);
  }, [active, card, stake, count]);

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <button
        onClick={toggleAutoPlay}
        aria-pressed={active}
        className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
          active ? "bg-gold/20 text-gold" : "bg-white/6 text-white/40 hover:bg-white/10"
        }`}
      >
        {active ? `Auto (${remaining} left)` : "Auto play"}
      </button>
      {!active && (
        <select
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="bg-white/5 border border-white/8 rounded-lg px-2 py-1 text-xs text-white/40 focus:outline-none"
          aria-label="Auto play count"
        >
          {[3, 5, 10, 20].map((n) => <option key={n} value={n}>{n}×</option>)}
        </select>
      )}
    </div>
  );
}
