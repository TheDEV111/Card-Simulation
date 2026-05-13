import { useEffect, useRef } from "react";

export function useIdleCallback(callback, { timeout = 2000, enabled = true } = {}) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    if (!enabled) return;

    const supported = "requestIdleCallback" in window;

    let id;
    if (supported) {
      id = window.requestIdleCallback((deadline) => callbackRef.current(deadline), { timeout });
    } else {
      id = setTimeout(() => callbackRef.current({ timeRemaining: () => 0, didTimeout: true }), timeout);
    }

    return () => {
      if (supported) window.cancelIdleCallback(id);
      else clearTimeout(id);
    };
  }, [enabled, timeout]);
}
