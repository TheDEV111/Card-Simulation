import { useBreakpoint } from "../../hooks/useBreakpoint";

export default function AdaptiveText({ xs, sm, md, lg, className = "" }) {
  const { breakpoint } = useBreakpoint();
  const text =
    breakpoint === "xs" ? (xs ?? sm ?? md ?? lg) :
    breakpoint === "sm" ? (sm ?? xs ?? md ?? lg) :
    breakpoint === "md" ? (md ?? sm ?? xs ?? lg) :
    (lg ?? md ?? sm ?? xs);

  return <span className={className}>{text}</span>;
}
