import { cn } from "../../utils/cn";

const CARDS = {
  1: { suit: "♠", name: "Spade",   color: "text-white" },
  2: { suit: "♥", name: "Heart",   color: "text-loss" },
  3: { suit: "♦", name: "Diamond", color: "text-gold" },
};

export default function CardSymbol({ card, size = "base", showName = false, className }) {
  const meta = CARDS[card];
  if (!meta) return null;
  const sizes = { sm: "text-base", base: "text-2xl", lg: "text-4xl", xl: "text-6xl" };
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn(sizes[size], meta.color)}>{meta.suit}</span>
      {showName && <span className="text-sm text-white/50">{meta.name}</span>}
    </span>
  );
}

export { CARDS };
