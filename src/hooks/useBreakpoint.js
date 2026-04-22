import { useMediaQuery } from "./useMediaQuery";

export function useBreakpoint() {
  const isSm = useMediaQuery("(min-width: 640px)");
  const isMd = useMediaQuery("(min-width: 768px)");
  const isLg = useMediaQuery("(min-width: 1024px)");
  const isXl = useMediaQuery("(min-width: 1280px)");

  const breakpoint =
    isXl ? "xl" :
    isLg ? "lg" :
    isMd ? "md" :
    isSm ? "sm" : "xs";

  return { breakpoint, isSm, isMd, isLg, isXl, isMobile: !isMd };
}
