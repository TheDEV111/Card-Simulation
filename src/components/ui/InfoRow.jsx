import { cn } from "../../utils/cn";

export default function InfoRow({ label, value, accent = false, className }) {
  return (
    <div className={cn("flex items-center justify-between py-3 border-b border-white/5 last:border-0", className)}>
      <span className="text-sm text-white/40">{label}</span>
      <span className={cn("text-sm font-medium", accent ? "text-gold" : "text-white/80")}>
        {value}
      </span>
    </div>
  );
}
