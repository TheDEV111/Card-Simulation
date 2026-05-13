import { useState, useEffect, useCallback, useRef } from "react";

export function useOnlineStatus({ pingUrl = "https://api.hiro.so/extended/v1/info", pingInterval = 30_000 } = {}) {
  const [online, setOnline] = useState(navigator.onLine);
  const [verified, setVerified] = useState(null);
  const timerRef = useRef(null);

  const ping = useCallback(async () => {
    try {
      const res = await fetch(pingUrl, { method: "HEAD", cache: "no-store", signal: AbortSignal.timeout(5000) });
      setVerified(res.ok);
    } catch {
      setVerified(false);
    }
  }, [pingUrl]);

  useEffect(() => {
    const onOnline = () => { setOnline(true); ping(); };
    const onOffline = () => { setOnline(false); setVerified(false); };

    window.addEventListener("online", onOnline);
    window.addEventListener("offline", onOffline);

    if (pingInterval > 0) {
      timerRef.current = setInterval(ping, pingInterval);
      ping();
    }

    return () => {
      window.removeEventListener("online", onOnline);
      window.removeEventListener("offline", onOffline);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [ping, pingInterval]);

  const isOffline = !online || verified === false;
  const isOnline = online && verified !== false;

  return { online, verified, isOffline, isOnline, ping };
}
