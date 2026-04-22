import { cn } from "../../utils/cn";

export default function SettingsRow({ label, description, control, className }) {
  return (
    <div className={cn("flex items-center justify-between gap-6 py-4 border-b border-white/5 last:border-0", className)}>
      <div className="space-y-0.5 min-w-0">
        <p className="text-sm font-medium text-white/80">{label}</p>
        {description && <p className="text-xs text-white/30">{description}</p>}
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}
