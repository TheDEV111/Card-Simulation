import { useState, useEffect } from "react";
import { registerSW } from "../pwa/sw-register.js";
import { isSWSupported } from "../pwa/sw-utils.js";

export function usePWAReady() {
  const [ready, setReady] = useState(false);
  const [swActive, setSWActive] = useState(false);

  useEffect(() => {
    if (!isSWSupported()) {
      setReady(true);
      return;
    }
    registerSW().then((reg) => {
      setSWActive(!!(reg?.active || navigator.serviceWorker.controller));
      setReady(true);
    }).catch(() => setReady(true));
  }, []);

  return { ready, swActive };
}
