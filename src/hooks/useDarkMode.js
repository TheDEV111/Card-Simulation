import { usePreferences } from "./usePreferences";

export function useDarkMode() {
  const { preferences, setPreference } = usePreferences();
  const isDark = preferences.darkMode ?? true;
  const toggle = () => setPreference("darkMode", !isDark);
  return { isDark, toggle };
}
