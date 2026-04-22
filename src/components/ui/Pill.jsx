export default function Pill({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-white/10 text-white/60",
    gold:    "bg-gold/20 text-gold",
    win:     "bg-win/20 text-win",
    loss:    "bg-loss/20 text-loss",
    active:  "bg-white/15 text-white",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variants[variant] ?? variants.default} ${className}`}
    >
      {children}
    </span>
  );
}
