import { useState, useEffect, useCallback } from "react";

export function useBeforeInstallPrompt() {
  const [prompt, setPrompt] = useState(null);
  const [outcome, setOutcome] = useState(null);

  useEffect(() => {
    const handler = (e) => { e.preventDefault(); setPrompt(e); };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const show = useCallback(async () => {
    if (!prompt) return null;
    prompt.prompt();
    const { outcome: o } = await prompt.userChoice;
    setOutcome(o);
    setPrompt(null);
    return o;
  }, [prompt]);

  return {
    canPrompt: !!prompt,
    outcome,
    accepted: outcome === "accepted",
    dismissed: outcome === "dismissed",
    show,
  };
}
