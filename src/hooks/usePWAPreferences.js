import { useState, useCallback } from "react";

const PREFIX = "pwa:pref:";

function getAll() {
  const prefs = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(PREFIX)) {
      try { prefs[key.slice(PREFIX.length)] = JSON.parse(localStorage.getItem(key)); }
      catch { prefs[key.slice(PREFIX.length)] = localStorage.getItem(key); }
    }
  }
  return prefs;
}

export function usePWAPreferences(defaults = {}) {
  const [prefs, setPrefs] = useState(() => ({ ...defaults, ...getAll() }));

  const set = useCallback((key, value) => {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
    setPrefs((p) => ({ ...p, [key]: value }));
  }, []);

  const get = useCallback((key) => prefs[key] ?? defaults[key] ?? null, [prefs, defaults]);

  const reset = useCallback((key) => {
    if (key) {
      localStorage.removeItem(PREFIX + key);
      setPrefs((p) => { const n = { ...p }; delete n[key]; return n; });
    } else {
      Object.keys(prefs).forEach((k) => localStorage.removeItem(PREFIX + k));
      setPrefs(defaults);
    }
  }, [prefs, defaults]);

  return { prefs, get, set, reset };
}
