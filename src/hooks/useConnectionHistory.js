import { useState, useEffect, useCallback } from "react";
import { getConnectionLog, clearConnectionLog, getOfflineCount, getTotalOfflineMs, logConnectionEvent } from "../pwa/connection-monitor.js";

export function useConnectionHistory() {
  const [log, setLog] = useState(getConnectionLog);

  const refresh = useCallback(() => setLog(getConnectionLog()), []);

  const clear = useCallback(() => {
    clearConnectionLog();
    setLog([]);
  }, []);

  useEffect(() => {
    const onOnline = () => { logConnectionEvent("online"); refresh(); };
    const onOffline = () => { logConnectionEvent("offline"); refresh(); };
    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);
    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
    };
  }, [refresh]);

  return {
    log,
    offlineCount: getOfflineCount(),
    totalOfflineMs: getTotalOfflineMs(),
    refresh,
    clear,
  };
}
