import { cn } from "../../utils/cn";

const VARIANTS = {
  win:     "bg-win/15 text-win border-win/30",
  loss:    "bg-loss/15 text-loss border-loss/30",
  pending: "bg-pending/15 text-pending border-pending/30",
  gold:    "bg-gold/15 text-gold border-gold/30",
  default: "bg-white/10 text-white/60 border-white/15",
};

export default function Badge({ children, variant = "default", className }) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded-md text-2xs font-medium border tracking-wide uppercase",
        VARIANTS[variant] || VARIANTS.default,
        className
      )}
    >
      {children}
    </span>
  );
}
