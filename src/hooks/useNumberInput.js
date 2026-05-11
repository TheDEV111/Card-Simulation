import { useState, useCallback } from "react";
import { clamp } from "../utils/math";

export function useNumberInput({
  initial = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
} = {}) {
  const [value, setValue] = useState(clamp(initial, min, max));

  const set = useCallback((v) => setValue(clamp(Number(v), min, max)), [min, max]);
  const increment = useCallback(() => setValue((v) => clamp(v + step, min, max)), [min, max, step]);
  const decrement = useCallback(() => setValue((v) => clamp(v - step, min, max)), [min, max, step]);
  const reset = useCallback(() => setValue(clamp(initial, min, max)), [initial, min, max]);

  const inputProps = {
    type: "number",
    value,
    min,
    max,
    step,
    onChange: (e) => set(e.target.value),
  };

  const atMin = value <= min;
  const atMax = value >= max;

  return { value, set, increment, decrement, reset, inputProps, atMin, atMax };
}
