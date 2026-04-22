import { useLocalStorage } from "./useLocalStorage";

const DEFAULTS = {
  soundEnabled:       false,
  confirmBeforePlay:  true,
  showTxLinks:        true,
  theme:              "dark",
  defaultStake:       1000,
  notificationsEmail: "",
};

export function useSettings() {
  const [settings, setSettings] = useLocalStorage("card-game-settings", DEFAULTS);

  function update(key, value) {
    setSettings((prev) => ({ ...prev, [key]: value }));
  }

  function reset() {
    setSettings(DEFAULTS);
  }

  return { settings, update, reset };
}
