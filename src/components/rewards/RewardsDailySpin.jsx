import { useState } from "react";
import { getLS, setLS } from "../../utils/storage";

const PRIZES = ["5 STX", "10 STX", "2 STX", "15 STX", "1 STX", "20 STX", "3 STX", "50 STX"];
const SPIN_KEY = "daily_spin_date";

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export default function RewardsDailySpin({ className = "" }) {
  const [spinning, setSpinning] = useState(false);
  const [prize, setPrize]       = useState(null);
  const [rotation, setRotation] = useState(0);
  const lastSpin = getLS(SPIN_KEY);
  const spunToday = lastSpin === todayStr();

  const spin = () => {
    if (spinning || spunToday) return;
    const idx    = Math.floor(Math.random() * PRIZES.length);
    const newRot = rotation + 1440 + (360 / PRIZES.length) * idx;
    setSpinning(true);
    setRotation(newRot);
    setTimeout(() => {
      setPrize(PRIZES[idx]);
      setSpinning(false);
      setLS(SPIN_KEY, todayStr());
    }, 2500);
  };

  return (
    <div className={`panel p-5 space-y-4 text-center ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Daily Spin</h3>
      <div className="relative w-28 h-28 mx-auto">
        <div
          className="w-full h-full rounded-full border-4 border-gold/30 flex items-center justify-center text-3xl"
          style={{
            transform: `rotate(${rotation}deg)`,
            transition: spinning ? "transform 2.5s cubic-bezier(0.17, 0.67, 0.12, 0.99)" : "none",
            background: "conic-gradient(from 0deg, #d4af3722, #34d39922, #d4af3722, #34d39922)",
          }}
        >
          🎡
        </div>
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 text-gold text-lg">▼</div>
      </div>
      {prize && !spinning && (
        <p className="text-sm font-bold text-gold">You won: {prize}!</p>
      )}
      {spunToday && !spinning && !prize && (
        <p className="text-xs text-white/30">Come back tomorrow for your next spin.</p>
      )}
      <button
        onClick={spin}
        disabled={spinning || spunToday}
        className={`text-sm px-6 py-2 rounded-full transition-colors ${
          spunToday
            ? "bg-white/5 text-white/20 cursor-not-allowed"
            : "bg-gold/20 text-gold hover:bg-gold/30"
        }`}
      >
        {spinning ? "Spinning…" : spunToday ? "Already spun today" : "Spin"}
      </button>
    </div>
  );
}
