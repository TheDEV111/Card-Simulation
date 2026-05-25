import { useState, useCallback, useEffect } from "react";

export function usePWAStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw !== null ? JSON.parse(raw) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    const handler = (e) => {
      if (e.key === key) {
        try { setValue(JSON.parse(e.newValue)); }
        catch { setValue(initialValue); }
      }
    };
    window.addEventListener("storage", handler);
    return () => window.removeEventListener("storage", handler);
  }, [key, initialValue]);

  const set = useCallback((val) => {
    const next = typeof val === "function" ? val(value) : val;
    setValue(next);
    if (next === undefined || next === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(key, JSON.stringify(next));
    }
  }, [key, value]);

  const remove = useCallback(() => {
    setValue(initialValue);
    localStorage.removeItem(key);
  }, [key, initialValue]);

  return [value, set, remove];
}
