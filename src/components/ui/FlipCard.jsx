import { useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function FlipCard({ front, back, className = "" }) {
  const [flipped, setFlipped]  = useState(false);
  const reduced = useReducedMotion();

  if (reduced) {
    return (
      <div className={className} onClick={() => setFlipped((f) => !f)}>
        {flipped ? back : front}
      </div>
    );
  }

  return (
    <div
      className={`relative cursor-pointer ${className}`}
      onClick={() => setFlipped((f) => !f)}
      style={{ perspective: "1000px" }}
    >
      <div
        className="relative w-full h-full transition-transform duration-500"
        style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none" }}
      >
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden" }}>
          {front}
        </div>
        <div className="absolute inset-0" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
          {back}
        </div>
      </div>
    </div>
  );
}
