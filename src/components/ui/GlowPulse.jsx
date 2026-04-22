export default function GlowPulse({ color = "gold", children, className = "" }) {
  const glows = {
    gold: "shadow-[0_0_24px_4px_rgba(212,175,55,0.25)]",
    win:  "shadow-[0_0_24px_4px_rgba(52,211,153,0.2)]",
    loss: "shadow-[0_0_24px_4px_rgba(248,113,113,0.2)]",
  };
  return (
    <div className={`rounded-xl transition-shadow duration-700 ${glows[color] ?? glows.gold} ${className}`}>
      {children}
    </div>
  );
}
