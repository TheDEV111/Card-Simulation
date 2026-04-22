import { cn } from "../../utils/cn";

export default function StatCard({ label, value, sub, trend, accent = false, className }) {
  const trendUp   = trend > 0;
  const trendDown = trend < 0;

  return (
    <div className={cn("panel px-5 py-4 space-y-1", className)}>
      <p className="label-caps">{label}</p>
      <p className={cn("text-2xl font-bold leading-none", accent ? "text-gold" : "text-white")}
         style={{ fontFamily: "Cinzel, serif" }}>
        {value}
      </p>
      {(sub || trend !== undefined) && (
        <p className={cn(
          "text-xs",
          trendUp   && "text-win",
          trendDown && "text-loss",
          !trendUp && !trendDown && "text-white/40"
        )}>
          {trend !== undefined && (trendUp ? "↑" : trendDown ? "↓" : "—")}{" "}
          {sub}
        </p>
      )}
    </div>
  );
}
