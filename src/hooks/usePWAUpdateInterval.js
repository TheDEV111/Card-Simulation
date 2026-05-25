import { useEffect, useRef } from "react";
import { checkForUpdate } from "../pwa/sw-register.js";

export function usePWAUpdateInterval(intervalMs = 10 * 60 * 1000) {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      checkForUpdate().catch(() => {});
    }, intervalMs);
    return () => clearInterval(intervalRef.current);
  }, [intervalMs]);
}
