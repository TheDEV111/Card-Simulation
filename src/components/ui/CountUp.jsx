import { useCountUp } from "../../hooks/useCountUp";

export default function CountUp({ value, duration = 800, suffix = "", prefix = "" }) {
  const display = useCountUp(value, duration);
  return <>{prefix}{display.toLocaleString()}{suffix}</>;
}
