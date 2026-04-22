import { useFlicker } from "../../hooks/useFlicker";

export default function NeonText({ children, color = "gold", className = "" }) {
  const dim = useFlicker(5000, 80);

  const shadows = {
    gold:  "0 0 8px #d4af37, 0 0 20px rgba(212,175,55,0.4)",
    win:   "0 0 8px #34d399, 0 0 20px rgba(52,211,153,0.4)",
    loss:  "0 0 8px #f87171, 0 0 20px rgba(248,113,113,0.4)",
    white: "0 0 8px #fff, 0 0 20px rgba(255,255,255,0.4)",
  };

  const textColor = { gold: "text-gold", win: "text-win", loss: "text-loss", white: "text-white" };

  return (
    <span
      className={`transition-opacity duration-75 ${dim ? "opacity-60" : "opacity-100"} ${textColor[color] ?? textColor.gold} ${className}`}
      style={{ textShadow: dim ? "none" : (shadows[color] ?? shadows.gold) }}
    >
      {children}
    </span>
  );
}
