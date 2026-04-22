import { formatSTX } from "../../utils/format";
import { cn } from "../../utils/cn";

export default function STXAmount({ microSTX, className, accent = true, size = "base" }) {
  const sizes = { sm: "text-sm", base: "text-base", lg: "text-xl", xl: "text-3xl" };
  return (
    <span className={cn(sizes[size], accent ? "text-gold font-semibold" : "text-white/80", className)}>
      {formatSTX(microSTX)}
    </span>
  );
}
