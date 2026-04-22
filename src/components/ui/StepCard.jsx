import { cn } from "../../utils/cn";

export default function StepCard({ number, title, description, className }) {
  return (
    <div className={cn("flex gap-4 panel p-5", className)}>
      <div className="w-8 h-8 rounded-full bg-gold/15 border border-gold/30 flex items-center justify-center shrink-0">
        <span className="text-xs font-bold text-gold" style={{ fontFamily: "Cinzel, serif" }}>{number}</span>
      </div>
      <div className="space-y-1">
        <p className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>{title}</p>
        <p className="text-xs text-white/40 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
