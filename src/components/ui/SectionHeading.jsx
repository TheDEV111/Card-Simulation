import { cn } from "../../utils/cn";

export default function SectionHeading({ title, subtitle, action, className }) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="space-y-0.5">
        <h2 className="text-lg font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          {title}
        </h2>
        {subtitle && <p className="text-sm text-white/40">{subtitle}</p>}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
