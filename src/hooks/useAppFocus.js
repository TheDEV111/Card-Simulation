import { useState, useEffect, useCallback, useRef } from "react";

export function useAppFocus({ onFocus, onBlur, refetchInterval = 0 } = {}) {
  const [focused, setFocused] = useState(true);
  const [focusCount, setFocusCount] = useState(0);
  const timerRef = useRef(null);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setFocusCount((c) => c + 1);
    onFocus?.();
  }, [onFocus]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    onBlur?.();
  }, [onBlur]);

  useEffect(() => {
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, [handleFocus, handleBlur]);

  return { focused, focusCount };
}
