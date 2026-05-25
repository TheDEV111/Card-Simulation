import { useState, useEffect } from "react";

function getConnectionInfo() {
  const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  if (!conn) return null;
  return {
    effectiveType: conn.effectiveType ?? "unknown",
    downlink: conn.downlink ?? null,
    rtt: conn.rtt ?? null,
    saveData: conn.saveData ?? false,
  };
}

export function useNetworkSpeed() {
  const [info, setInfo] = useState(getConnectionInfo);
  const supported = info !== null;

  useEffect(() => {
    const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (!conn) return;
    const update = () => setInfo(getConnectionInfo());
    conn.addEventListener("change", update);
    return () => conn.removeEventListener("change", update);
  }, []);

  const isFast = info?.effectiveType === "4g";
  const isSlow = info?.effectiveType === "2g" || info?.effectiveType === "slow-2g";
  const is3g = info?.effectiveType === "3g";

  return { ...info, supported, isFast, isSlow, is3g };
}
