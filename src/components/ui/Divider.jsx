import { cn } from "../../utils/cn";

export default function Divider({ label, className }) {
  if (label) {
    return (
      <div className={cn("flex items-center gap-3", className)}>
        <div className="flex-1 h-px bg-white/5" />
        <span className="text-2xs text-white/20 uppercase tracking-widest">{label}</span>
        <div className="flex-1 h-px bg-white/5" />
      </div>
    );
  }
  return <div className={cn("h-px bg-white/5", className)} />;
}
