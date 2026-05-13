import { useState, useEffect } from "react";
import { isInstalledPWA } from "../pwa/sw-utils.js";

export function useInstallationState() {
  const [installed, setInstalled] = useState(() => isInstalledPWA());
  const [justInstalled, setJustInstalled] = useState(false);

  useEffect(() => {
    const handler = () => {
      setInstalled(true);
      setJustInstalled(true);
      setTimeout(() => setJustInstalled(false), 5000);
    };
    window.addEventListener("appinstalled", handler);
    return () => window.removeEventListener("appinstalled", handler);
  }, []);

  return { installed, justInstalled };
}
