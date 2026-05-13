import { useState, useEffect } from "react";

function getConnectionInfo() {
  const conn = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;
  if (!conn) return null;
  return {
    type: conn.type ?? null,
    effectiveType: conn.effectiveType ?? null,
    downlink: conn.downlink ?? null,
    rtt: conn.rtt ?? null,
    saveData: conn.saveData ?? false,
  };
}

export function useConnectionType() {
  const supported = typeof navigator !== "undefined" && "connection" in navigator;
  const [info, setInfo] = useState(() => (supported ? getConnectionInfo() : null));

  useEffect(() => {
    if (!supported) return;
    const conn = navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection;
    const update = () => setInfo(getConnectionInfo());
    conn?.addEventListener("change", update);
    return () => conn?.removeEventListener("change", update);
  }, [supported]);

  return { supported, ...info };
}
