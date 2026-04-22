import { useScrollProgress } from "../../hooks/useScrollProgress";

export default function ScrollProgress({ color = "bg-gold", height = 1, className = "" }) {
  const progress = useScrollProgress();
  return (
    <div
      className={`fixed top-0 left-0 z-50 ${color} ${height === 1 ? "h-px" : `h-${height}`} transition-none ${className}`}
      style={{ width: `${progress * 100}%` }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
    />
  );
}
