import { useAnimatedValue } from "../../hooks/useAnimatedValue";

export default function AnimatedCounter({ value, duration = 800, decimals = 0, prefix = "", suffix = "", className = "" }) {
  const animated = useAnimatedValue(value, duration);
  const display  = animated.toFixed(decimals);

  return (
    <span className={`tabular-nums ${className}`}>
      {prefix}{display}{suffix}
    </span>
  );
}
