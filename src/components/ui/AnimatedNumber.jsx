import { useCountUp } from "../../hooks/useCountUp";

export default function AnimatedNumber({ value, duration = 1200, prefix = "", suffix = "", className = "" }) {
  const count = useCountUp(value, duration);

  return (
    <span className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
}
