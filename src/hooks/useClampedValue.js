import { useState, useCallback } from "react";
import { clamp } from "../utils/numbers";

export function useClampedValue(initial, min, max) {
  const [value, setRaw] = useState(clamp(initial, min, max));
  const setValue = useCallback((v) => setRaw(clamp(typeof v === "function" ? v(value) : v, min, max)), [min, max, value]);
  return [value, setValue];
}
