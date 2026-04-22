import { cn } from "../../utils/cn";

export default function Spinner({ size = 20, className }) {
  return (
    <span
      className={cn("inline-block rounded-full border-2 border-white/20 border-t-gold animate-spin", className)}
      style={{ width: size, height: size }}
    />
  );
}
