import { useEffect, useRef } from "react";

export function useBeforeUnload(message, { enabled = true } = {}) {
  const messageRef = useRef(message);
  messageRef.current = message;

  useEffect(() => {
    if (!enabled) return;
    const handler = (e) => {
      const msg = typeof messageRef.current === "function" ? messageRef.current() : messageRef.current;
      if (!msg) return;
      e.preventDefault();
      e.returnValue = msg;
      return msg;
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [enabled]);
}
