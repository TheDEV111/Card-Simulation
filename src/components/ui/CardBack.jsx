export default function CardBack({ size = "md", className = "" }) {
  const sizes = {
    sm: "w-12 h-16 text-xs",
    md: "w-16 h-22 text-sm",
    lg: "w-20 h-28 text-base",
  };

  return (
    <div
      className={`rounded-xl bg-surface-raised border border-gold/20 flex items-center justify-center ${sizes[size]} ${className}`}
      style={{
        backgroundImage: "repeating-linear-gradient(45deg, rgba(212,168,75,0.04) 0px, rgba(212,168,75,0.04) 1px, transparent 1px, transparent 8px)",
      }}
      aria-hidden="true"
    >
      <span className="text-gold/30 select-none" style={{ fontFamily: "Cinzel, serif" }}>?</span>
    </div>
  );
}
