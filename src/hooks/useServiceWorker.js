import { useState, useEffect, useCallback } from "react";
import { registerSW, checkForUpdate, getRegistration } from "../pwa/sw-register.js";
import { isSWSupported } from "../pwa/sw-utils.js";

export function useServiceWorker() {
  const [state, setState] = useState({
    supported: isSWSupported(),
    registered: false,
    active: false,
    updateReady: false,
    registration: null,
    error: null,
  });

  useEffect(() => {
    if (!isSWSupported()) return;

    registerSW().then((reg) => {
      if (!reg) return;
      setState((s) => ({ ...s, registered: true, registration: reg, active: !!reg.active }));
    });

    const onUpdate = (e) => {
      setState((s) => ({ ...s, updateReady: true, registration: e.detail?.registration }));
    };

    window.addEventListener("sw:update-ready", onUpdate);
    return () => window.removeEventListener("sw:update-ready", onUpdate);
  }, []);

  const update = useCallback(async () => {
    await checkForUpdate();
  }, []);

  const applyUpdate = useCallback(() => {
    const reg = getRegistration();
    if (reg?.waiting) reg.waiting.postMessage({ type: "SKIP_WAITING" });
    window.location.reload();
  }, []);

  return { ...state, update, applyUpdate };
}
