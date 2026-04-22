import { useEffect, useState } from "react";

export default function GameCountdown({ from = 3, onComplete, className = "" }) {
  const [count, setCount] = useState(from);

  useEffect(() => {
    if (count === 0) { onComplete?.(); return; }
    const t = setTimeout(() => setCount((c) => c - 1), 800);
    return () => clearTimeout(t);
  }, [count]);

  if (count === 0) return null;

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span
        key={count}
        className="text-7xl font-bold text-gold tabular-nums"
        style={{
          fontFamily: "Cinzel, serif",
          animation: "pop 0.8s cubic-bezier(0.16,1,0.3,1) both",
        }}
      >
        {count}
      </span>
    </div>
  );
}
