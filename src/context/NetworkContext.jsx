import { createContext, useContext } from "react";
import { useOnlineStatus } from "../hooks/useOnlineStatus.js";
import { useConnectionType } from "../hooks/useConnectionType.js";

const NetworkContext = createContext(null);

export function NetworkProvider({ children, pingInterval = 30_000 }) {
  const online = useOnlineStatus({ pingInterval });
  const connection = useConnectionType();

  const value = {
    ...online,
    ...connection,
    isSlow: connection.effectiveType === "slow-2g" || connection.effectiveType === "2g",
    isFast: connection.effectiveType === "4g" || !connection.effectiveType,
    saveData: connection.saveData ?? false,
  };

  return <NetworkContext.Provider value={value}>{children}</NetworkContext.Provider>;
}

export function useNetwork() {
  const ctx = useContext(NetworkContext);
  if (!ctx) throw new Error("useNetwork must be used within NetworkProvider");
  return ctx;
}
