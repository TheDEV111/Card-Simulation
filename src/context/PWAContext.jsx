import { createContext, useContext, useMemo } from "react";
import { useServiceWorker } from "../hooks/useServiceWorker.js";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";
import { usePWAInstall } from "../hooks/usePWAInstall.js";
import { usePWADisplay } from "../hooks/usePWADisplay.js";
import { useSWUpdate } from "../hooks/useSWUpdate.js";

const PWAContext = createContext(null);

export function PWAProvider({ children }) {
  const sw = useServiceWorker();
  const network = useOnlineStatus();
  const install = usePWAInstall();
  const display = usePWADisplay();
  const update = useSWUpdate();

  const value = useMemo(() => ({
    sw,
    network,
    install,
    display,
    update,
    isReady: sw.registered,
  }), [sw, network, install, display, update]);

  return <PWAContext.Provider value={value}>{children}</PWAContext.Provider>;
}

export function usePWA() {
  const ctx = useContext(PWAContext);
  if (!ctx) throw new Error("usePWA must be used within PWAProvider");
  return ctx;
}
