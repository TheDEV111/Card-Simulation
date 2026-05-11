import { useState, useCallback, useRef } from "react";

export function useControlled({ value, defaultValue, onChange }) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(defaultValue);

  const currentValue = isControlled ? value : internalValue;

  const setValue = useCallback((next) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  }, [isControlled, onChange]);

  return [currentValue, setValue];
}
