import { useState, useEffect } from "react";

function getConnection() {
  return navigator.connection ?? navigator.mozConnection ?? navigator.webkitConnection ?? null;
}

function snapshot(conn) {
  if (!conn) return { effectiveType: null, downlink: null, rtt: null, saveData: false };
  return {
    effectiveType: conn.effectiveType ?? null,
    downlink: conn.downlink ?? null,
    rtt: conn.rtt ?? null,
    saveData: conn.saveData ?? false,
  };
}

export function useConnectionType() {
  const [state, setState] = useState(() => snapshot(getConnection()));

  useEffect(() => {
    const conn = getConnection();
    if (!conn) return;
    const update = () => setState(snapshot(conn));
    conn.addEventListener("change", update);
    return () => conn.removeEventListener("change", update);
  }, []);

  return state;
}
