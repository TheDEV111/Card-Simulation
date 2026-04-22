import { useMediaQuery } from "../../hooks/useMediaQuery";

export default function ReducedMotion({ children, fallback = null }) {
  const prefersReduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  return prefersReduced ? fallback : children;
}
