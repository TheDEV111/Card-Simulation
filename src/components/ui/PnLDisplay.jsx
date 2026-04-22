import { formatSTX } from "../../utils/format";
import { cn } from "../../utils/cn";

export default function PnLDisplay({ microSTX, size = "base" }) {
  const positive = microSTX > 0;
  const neutral  = microSTX === 0;
  const sizes = { sm: "text-sm", base: "text-base", lg: "text-xl", xl: "text-3xl" };

  return (
    <span className={cn(
      "font-semibold",
      sizes[size],
      positive ? "text-win" : neutral ? "text-white/40" : "text-loss"
    )}>
      {positive ? "+" : ""}{formatSTX(microSTX)}
    </span>
  );
}
