import { createContext, useContext } from "react";
import { usePWAInstall } from "../hooks/usePWAInstall.js";

const InstallContext = createContext(null);

export function InstallProvider({ children }) {
  const install = usePWAInstall();
  return <InstallContext.Provider value={install}>{children}</InstallContext.Provider>;
}

export function useInstall() {
  const ctx = useContext(InstallContext);
  if (!ctx) throw new Error("useInstall must be used within InstallProvider");
  return ctx;
}
