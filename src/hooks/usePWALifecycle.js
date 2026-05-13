import { useEffect, useCallback } from "react";
import { registerSW } from "../pwa/sw-register.js";

export function usePWALifecycle({ onInstalled, onActivated, onUpdateReady, onOffline, onOnline } = {}) {
  useEffect(() => {
    registerSW();
  }, []);

  useEffect(() => {
    if (onUpdateReady) {
      window.addEventListener("sw:update-ready", onUpdateReady);
      return () => window.removeEventListener("sw:update-ready", onUpdateReady);
    }
  }, [onUpdateReady]);

  useEffect(() => {
    const handleOffline = () => onOffline?.();
    const handleOnline = () => onOnline?.();
    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);
    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, [onOffline, onOnline]);

  useEffect(() => {
    window.addEventListener("appinstalled", () => onInstalled?.(), { once: true });
  }, [onInstalled]);
}
