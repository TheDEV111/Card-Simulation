const SUITS = {
  1: { symbol: "♠", label: "Spades",   color: "text-white" },
  2: { symbol: "♦", label: "Diamonds", color: "text-gold" },
  3: { symbol: "♣", label: "Clubs",    color: "text-white/70" },
};

export default function SuitIcon({ suit, size = "md", className = "" }) {
  const s = SUITS[suit] ?? SUITS[1];
  const sizes = { sm: "text-sm", md: "text-base", lg: "text-xl", xl: "text-3xl" };
  return (
    <span
      className={`${sizes[size]} ${s.color} ${className}`}
      aria-label={s.label}
      role="img"
    >
      {s.symbol}
    </span>
  );
}
