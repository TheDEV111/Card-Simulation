import { useState, useEffect, useCallback } from "react";
import { INSTALL_DISMISSED_KEY } from "../pwa/config.js";
import { isInstalledPWA } from "../pwa/sw-utils.js";

export function usePWAInstall() {
  const [prompt, setPrompt] = useState(null);
  const [canInstall, setCanInstall] = useState(false);
  const [installed, setInstalled] = useState(isInstalledPWA());
  const [dismissed, setDismissed] = useState(
    () => localStorage.getItem(INSTALL_DISMISSED_KEY) === "true"
  );
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
      setCanInstall(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    window.addEventListener("appinstalled", () => setInstalled(true));
    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const install = useCallback(async () => {
    if (!prompt) return null;
    prompt.prompt();
    const { outcome: result } = await prompt.userChoice;
    setOutcome(result);
    setCanInstall(false);
    setPrompt(null);
    if (result === "accepted") setInstalled(true);
    return result;
  }, [prompt]);

  const dismiss = useCallback(() => {
    setDismissed(true);
    localStorage.setItem(INSTALL_DISMISSED_KEY, "true");
  }, []);

  const reset = useCallback(() => {
    setDismissed(false);
    localStorage.removeItem(INSTALL_DISMISSED_KEY);
  }, []);

  const isIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
  const showBanner = canInstall && !installed && !dismissed;
  const showIOSGuide = isIOS && !installed && !dismissed && !canInstall;

  return { canInstall, installed, dismissed, outcome, isIOS, showBanner, showIOSGuide, install, dismiss, reset };
}
