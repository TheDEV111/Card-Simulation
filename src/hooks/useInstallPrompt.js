import { useState, useEffect, useCallback } from "react";

export function useInstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setPrompt(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  useEffect(() => {
    const handler = (e) => setOutcome(e.type === "appinstalled" ? "accepted" : null);
    window.addEventListener("appinstalled", handler);
    return () => window.removeEventListener("appinstalled", handler);
  }, []);

  const install = useCallback(async () => {
    if (!prompt) return null;
    prompt.prompt();
    const { outcome: result } = await prompt.userChoice;
    setOutcome(result);
    setPrompt(null);
    return result;
  }, [prompt]);

  return {
    canInstall: !!prompt,
    outcome,
    install,
    isInstalled: outcome === "accepted",
  };
}
