import { useState } from "react";
import CardSymbol from "./CardSymbol";

export default function CardFlip({ frontCard, backCard, revealed = false }) {
  const [flipped, setFlipped] = useState(revealed);

  return (
    <div
      className="cursor-pointer select-none"
      style={{ perspective: "600px" }}
      onClick={() => !revealed && setFlipped((v) => !v)}
    >
      <div
        style={{
          transition: "transform 0.5s cubic-bezier(0.16,1,0.3,1)",
          transformStyle: "preserve-3d",
          transform: (revealed || flipped) ? "rotateY(180deg)" : "rotateY(0deg)",
          position: "relative",
          width: 72,
          height: 96,
        }}
      >
        {/* Back */}
        <div className="absolute inset-0 rounded-xl bg-surface-overlay border border-white/10 flex items-center justify-center"
             style={{ backfaceVisibility: "hidden" }}>
          <span className="text-3xl opacity-30">🂠</span>
        </div>
        {/* Front */}
        <div className="absolute inset-0 rounded-xl bg-surface-raised border border-gold/30 flex items-center justify-center"
             style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          <CardSymbol card={backCard || frontCard} size="lg" />
        </div>
      </div>
    </div>
  );
}
