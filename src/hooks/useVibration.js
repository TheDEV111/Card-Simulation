import { useCallback } from "react";

const PATTERNS = {
  short: [50],
  medium: [100],
  long: [200],
  double: [50, 100, 50],
  error: [100, 50, 100, 50, 100],
  success: [50, 50, 150],
};

export function useVibration() {
  const supported = typeof navigator !== "undefined" && "vibrate" in navigator;

  const vibrate = useCallback((pattern = [100]) => {
    if (!supported) return false;
    return navigator.vibrate(pattern);
  }, [supported]);

  const pattern = useCallback((name) => {
    const p = PATTERNS[name];
    if (!p) return false;
    return vibrate(p);
  }, [vibrate]);

  const cancel = useCallback(() => {
    if (!supported) return;
    navigator.vibrate(0);
  }, [supported]);

  return { supported, vibrate, pattern, cancel, PATTERNS };
}
