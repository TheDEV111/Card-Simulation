import { useSpringValue } from "../../hooks/useSpringValue";

export default function ScoreDisplay({ score = 0, label = "Score", prefix, suffix, size = "lg", className = "" }) {
  const animated = useSpringValue(score, { stiffness: 80, damping: 12 });
  const sizes = { sm: "text-2xl", md: "text-4xl", lg: "text-6xl", xl: "text-8xl" };

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 dark:text-gray-500">{label}</p>
      <p className={`font-bold tabular-nums text-gray-900 dark:text-white ${sizes[size] ?? sizes.lg}`}>
        {prefix}<span>{Math.round(animated)}</span>{suffix}
      </p>
    </div>
  );
}
