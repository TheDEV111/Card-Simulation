import { useState, useCallback } from "react";

export function useEyeDropper() {
  const [color, setColor] = useState(null);
  const [error, setError] = useState(null);
  const [picking, setPicking] = useState(false);
  const supported = typeof window !== "undefined" && "EyeDropper" in window;

  const pick = useCallback(async () => {
    if (!supported) return null;
    setPicking(true);
    setError(null);
    try {
      const dropper = new window.EyeDropper();
      const result = await dropper.open();
      setColor(result.sRGBHex);
      return result.sRGBHex;
    } catch (err) {
      if (err.name !== "AbortError") setError(err.message);
      return null;
    } finally {
      setPicking(false);
    }
  }, [supported]);

  const reset = useCallback(() => setColor(null), []);

  return { supported, color, error, picking, pick, reset };
}
