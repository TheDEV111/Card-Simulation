import { useState, useEffect, useCallback } from "react";
import { getRegistration, skipWaiting, checkForUpdate } from "../pwa/sw-register.js";

export function useSWUpdate({ checkInterval = 60_000 * 10 } = {}) {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const onUpdate = () => setUpdateAvailable(true);
    window.addEventListener("sw:update-ready", onUpdate);

    const timer = setInterval(() => checkForUpdate(), checkInterval);

    return () => {
      window.removeEventListener("sw:update-ready", onUpdate);
      clearInterval(timer);
    };
  }, [checkInterval]);

  const apply = useCallback(() => {
    const reg = getRegistration();
    if (!reg?.waiting) return;
    setUpdating(true);
    skipWaiting(reg);

    const onControllerChange = () => {
      window.location.reload();
    };
    navigator.serviceWorker.addEventListener("controllerchange", onControllerChange, { once: true });
  }, []);

  const dismiss = useCallback(() => setUpdateAvailable(false), []);

  return { updateAvailable, updating, apply, dismiss };
}
