import { useState, useEffect } from "react";

export function usePWATheme() {
  const [prefersDark, setPrefersDark] = useState(
    () => window.matchMedia("(prefers-color-scheme: dark)").matches
  );
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [prefersHighContrast, setPrefersHighContrast] = useState(
    () => window.matchMedia("(prefers-contrast: high)").matches
  );

  useEffect(() => {
    const dark = window.matchMedia("(prefers-color-scheme: dark)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const contrast = window.matchMedia("(prefers-contrast: high)");

    const onDark = (e) => setPrefersDark(e.matches);
    const onMotion = (e) => setPrefersReducedMotion(e.matches);
    const onContrast = (e) => setPrefersHighContrast(e.matches);

    dark.addEventListener("change", onDark);
    motion.addEventListener("change", onMotion);
    contrast.addEventListener("change", onContrast);

    return () => {
      dark.removeEventListener("change", onDark);
      motion.removeEventListener("change", onMotion);
      contrast.removeEventListener("change", onContrast);
    };
  }, []);

  return { prefersDark, prefersReducedMotion, prefersHighContrast };
}
