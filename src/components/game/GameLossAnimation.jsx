import { useEffect, useState } from "react";

export default function GameLossAnimation({ stake, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 80);
    const t2 = setTimeout(() => onDone?.(), 1800);
    return () => [t1, t2].forEach(clearTimeout);
  }, []);

  return (
    <div
      className="flex flex-col items-center gap-3 transition-all duration-500"
      style={{ opacity: visible ? 1 : 0, transform: visible ? "none" : "scale(0.9)" }}
    >
      <span className="text-5xl text-loss/60" aria-hidden="true">✗</span>
      <div className="text-center">
        <p className="text-xl font-bold text-loss tabular-nums" style={{ fontFamily: "Cinzel, serif" }}>
          −{(stake / 1_000_000).toFixed(2)} STX
        </p>
        <p className="text-xs text-white/30 mt-1">Better luck next time</p>
      </div>
    </div>
  );
}
