export default function FocusRing({ children, color = "gold", className = "" }) {
  const rings = {
    gold:  "focus-within:ring-2 focus-within:ring-gold/50 focus-within:ring-offset-1 focus-within:ring-offset-transparent",
    white: "focus-within:ring-2 focus-within:ring-white/30 focus-within:ring-offset-1 focus-within:ring-offset-transparent",
    win:   "focus-within:ring-2 focus-within:ring-win/40 focus-within:ring-offset-1 focus-within:ring-offset-transparent",
  };
  return (
    <div className={`rounded-xl transition-shadow ${rings[color] ?? rings.gold} ${className}`}>
      {children}
    </div>
  );
}
