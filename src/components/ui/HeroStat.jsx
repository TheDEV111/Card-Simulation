import CountUp from "./CountUp";
import { cn } from "../../utils/cn";

export default function HeroStat({ label, value, suffix = "", animate = true, className }) {
  return (
    <div className={cn("text-center space-y-1", className)}>
      <p className="text-5xl font-bold text-gold leading-none" style={{ fontFamily: "Cinzel, serif" }}>
        {animate ? <CountUp value={Number(value)} suffix={suffix} /> : `${value}${suffix}`}
      </p>
      <p className="text-xs text-white/30 uppercase tracking-widest">{label}</p>
    </div>
  );
}
