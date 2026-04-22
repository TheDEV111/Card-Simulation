import { cn } from "../../utils/cn";

export default function EmptyState({ icon, title, description, action, className }) {
  return (
    <div className={cn("flex flex-col items-center justify-center text-center py-16 px-6 space-y-4", className)}>
      {icon && (
        <div className="text-5xl opacity-40 select-none">{icon}</div>
      )}
      <div className="space-y-2 max-w-xs">
        <p className="text-base font-semibold text-white/60" style={{ fontFamily: "Cinzel, serif" }}>
          {title}
        </p>
        {description && (
          <p className="text-sm text-white/30 leading-relaxed">{description}</p>
        )}
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
