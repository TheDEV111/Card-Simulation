import { useBreakpoint } from "../../hooks/useBreakpoint";

export default function ShowAt({ min, max, children }) {
  const { breakpoint } = useBreakpoint();
  const order = ["xs", "sm", "md", "lg", "xl"];
  const i = order.indexOf(breakpoint);
  const minI = min ? order.indexOf(min) : 0;
  const maxI = max ? order.indexOf(max) : order.length - 1;
  if (i < minI || i > maxI) return null;
  return children;
}
