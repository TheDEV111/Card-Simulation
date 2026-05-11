import { useEffect, useRef } from "react";
import { createKeymap } from "../utils/keymap";

export function useKeymap(bindings, { target = window, enabled = true } = {}) {
  const bindingsRef = useRef(bindings);
  bindingsRef.current = bindings;

  useEffect(() => {
    if (!enabled) return;
    const handler = createKeymap(
      Object.fromEntries(
        Object.entries(bindingsRef.current).map(([k, fn]) => [
          k,
          (e) => bindingsRef.current[k]?.(e),
        ])
      )
    );
    const el = target === window ? window : target;
    el.addEventListener("keydown", handler);
    return () => el.removeEventListener("keydown", handler);
  }, [target, enabled]);
}
