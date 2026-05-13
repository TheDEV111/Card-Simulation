import { useEffect, useState, useCallback } from "react";

export function useSWMessage(type) {
  const [lastMessage, setLastMessage] = useState(null);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;
    const handler = (event) => {
      if (!type || event.data?.type === type) {
        setLastMessage(event.data);
      }
    };
    navigator.serviceWorker.addEventListener("message", handler);
    return () => navigator.serviceWorker.removeEventListener("message", handler);
  }, [type]);

  const send = useCallback((data) => {
    navigator.serviceWorker?.controller?.postMessage(data);
  }, []);

  return { lastMessage, send };
}
