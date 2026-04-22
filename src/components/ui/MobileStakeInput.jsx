import { useState } from "react";
import { clampStake } from "../../utils/validation";
import STXAmount from "./STXAmount";

const PRESETS = [10_000, 50_000, 100_000, 500_000, 1_000_000];

export default function MobileStakeInput({ value, onChange, className = "" }) {
  const [inputMode, setInputMode] = useState(false);
  const [raw, setRaw] = useState("");

  const handleRawSubmit = () => {
    const ustx = Math.round(parseFloat(raw.replace(/,/g, "")) * 1_000_000);
    if (!isNaN(ustx)) onChange(clampStake(ustx));
    setInputMode(false);
    setRaw("");
  };

  if (inputMode) {
    return (
      <div className={`flex gap-2 ${className}`}>
        <input
          type="number"
          autoFocus
          placeholder="Amount in STX"
          value={raw}
          onChange={(e) => setRaw(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") handleRawSubmit(); if (e.key === "Escape") setInputMode(false); }}
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-gold/40 text-sm"
        />
        <button onClick={handleRawSubmit} className="btn-primary px-4 py-3 text-sm">Set</button>
      </div>
    );
  }

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((p) => (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`flex-1 min-w-[60px] py-2.5 rounded-xl text-xs font-semibold transition-colors ${
              value === p ? "bg-gold text-black" : "bg-white/8 text-white/60 hover:bg-white/12"
            }`}
          >
            <STXAmount ustx={p} />
          </button>
        ))}
      </div>
      <button
        onClick={() => setInputMode(true)}
        className="w-full text-xs text-white/30 hover:text-white/50 transition-colors py-1"
      >
        Custom amount
      </button>
    </div>
  );
}
