import { useState, useCallback } from "react";

export function useSessionStorage(key, initialValue) {
  const [stored, setStored] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item !== null ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const v = value instanceof Function ? value(stored) : value;
      setStored(v);
      window.sessionStorage.setItem(key, JSON.stringify(v));
    } catch {/* storage unavailable */}
  }, [key, stored]);

  const remove = useCallback(() => {
    setStored(initialValue);
    window.sessionStorage.removeItem(key);
  }, [key, initialValue]);

  return [stored, setValue, remove];
}
