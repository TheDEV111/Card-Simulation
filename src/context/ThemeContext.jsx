import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { getLS, setLS } from "../utils/storage";

const ThemeContext = createContext(null);

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => getLS("theme", "dark"));
  const [accent, setAccentState] = useState(() => getLS("accent", "gold"));

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    setLS("theme", theme);
  }, [theme]);

  useEffect(() => {
    document.documentElement.setAttribute("data-accent", accent);
    setLS("accent", accent);
  }, [accent]);

  const setTheme  = useCallback((t) => setThemeState(t), []);
  const setAccent = useCallback((a) => setAccentState(a), []);
  const toggle    = useCallback(() => setThemeState((t) => t === "dark" ? "light" : "dark"), []);

  return (
    <ThemeContext.Provider value={{ theme, accent, setTheme, setAccent, toggle, isDark: theme === "dark" }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
