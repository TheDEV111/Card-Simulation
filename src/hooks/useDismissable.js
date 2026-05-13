import { useState, useCallback } from "react";

export function useDismissable(key, defaultVisible = true) {
  const storageKey = `dismissed_${key}`;
  const [visible, setVisible] = useState(() => {
    try {
      return localStorage.getItem(storageKey) !== "1" && defaultVisible;
    } catch {
      return defaultVisible;
    }
  });

  const dismiss = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(storageKey, "1");
    } catch {}
  }, [storageKey]);

  return [visible, dismiss];
}
