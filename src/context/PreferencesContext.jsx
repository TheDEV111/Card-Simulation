import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { getLS, setLS } from "../utils/storage";

const DEFAULTS = {
  soundEnabled:     true,
  animationsEnabled: true,
  confirmPlay:      true,
  defaultStake:     10_000,
  compactMode:      false,
  language:         "en",
};

const PreferencesContext = createContext(null);

export function PreferencesProvider({ children }) {
  const [prefs, setPrefs] = useState(() => ({ ...DEFAULTS, ...getLS("prefs", {}) }));

  useEffect(() => { setLS("prefs", prefs); }, [prefs]);

  const set = useCallback((key, value) => {
    setPrefs((p) => ({ ...p, [key]: value }));
  }, []);

  const reset = useCallback(() => { setPrefs(DEFAULTS); }, []);

  return (
    <PreferencesContext.Provider value={{ prefs, set, reset }}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
