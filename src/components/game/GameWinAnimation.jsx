import { useEffect, useState } from "react";
import NeonText from "../ui/NeonText";

export default function GameWinAnimation({ payout, onDone }) {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 100);
    const t2 = setTimeout(() => setPhase(2), 800);
    const t3 = setTimeout(() => { setPhase(3); onDone?.(); }, 2400);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className="transition-all duration-700"
        style={{
          opacity: phase >= 1 ? 1 : 0,
          transform: phase >= 1 ? "scale(1) translateY(0)" : "scale(0.8) translateY(10px)",
        }}
      >
        <NeonText color="win" className="text-6xl" style={{ fontFamily: "Cinzel, serif" }}>✓</NeonText>
      </div>
      <div
        className="transition-all duration-500 delay-300"
        style={{ opacity: phase >= 2 ? 1 : 0, transform: phase >= 2 ? "none" : "translateY(8px)" }}
      >
        <p className="text-2xl font-bold text-win tabular-nums" style={{ fontFamily: "Cinzel, serif" }}>
          +{(payout / 1_000_000).toFixed(2)} STX
        </p>
      </div>
    </div>
  );
}
