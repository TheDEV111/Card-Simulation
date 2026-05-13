import { useState, useEffect, useCallback } from "react";
import { getRegistration } from "../pwa/sw-register.js";
import {
  isPushSupported,
  checkPushPermission,
  requestPushPermission,
  subscribeToPush,
  unsubscribeFromPush,
  getExistingSubscription,
  serializeSubscription,
} from "../pwa/push-utils.js";

const VAPID_KEY = import.meta.env.VITE_VAPID_PUBLIC_KEY ?? "";

export function usePushNotifications() {
  const [supported] = useState(isPushSupported);
  const [permission, setPermission] = useState("default");
  const [subscription, setSubscription] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supported) return;
    checkPushPermission().then(setPermission);
    const reg = getRegistration();
    if (reg) getExistingSubscription(reg).then(setSubscription);
  }, [supported]);

  const subscribe = useCallback(async () => {
    if (!supported || !VAPID_KEY) return null;
    setLoading(true);
    setError(null);
    try {
      const perm = await requestPushPermission();
      setPermission(perm);
      if (perm !== "granted") return null;
      const reg = getRegistration();
      if (!reg) throw new Error("Service worker not registered");
      const sub = await subscribeToPush(reg, VAPID_KEY);
      setSubscription(sub);
      return serializeSubscription(sub);
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  }, [supported]);

  const unsubscribe = useCallback(async () => {
    setLoading(true);
    try {
      const reg = getRegistration();
      await unsubscribeFromPush(reg);
      setSubscription(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    supported,
    permission,
    subscription,
    isSubscribed: !!subscription,
    loading,
    error,
    subscribe,
    unsubscribe,
  };
}
