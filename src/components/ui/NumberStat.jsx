import CountUp from "./CountUp";
import { cn } from "../../utils/cn";

export default function NumberStat({ label, value, suffix = "", accent = false, animate = true }) {
  return (
    <div className="space-y-0.5">
      <p className="label-caps">{label}</p>
      <p className={cn("text-3xl font-bold leading-none", accent ? "text-gold" : "text-white")}
         style={{ fontFamily: "Cinzel, serif" }}>
        {animate ? <CountUp value={Number(value)} suffix={suffix} /> : `${value}${suffix}`}
      </p>
    </div>
  );
}
