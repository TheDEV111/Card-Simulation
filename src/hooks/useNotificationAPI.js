import { useState, useCallback } from "react";

export function useNotificationAPI() {
  const supported = typeof window !== "undefined" && "Notification" in window;
  const [permission, setPermission] = useState(() =>
    supported ? Notification.permission : "denied"
  );

  const request = useCallback(async () => {
    if (!supported) return "denied";
    const result = await Notification.requestPermission();
    setPermission(result);
    return result;
  }, [supported]);

  const notify = useCallback(async (title, options = {}) => {
    if (!supported) return null;
    let perm = permission;
    if (perm === "default") perm = await request();
    if (perm !== "granted") return null;
    const n = new Notification(title, options);
    return n;
  }, [supported, permission, request]);

  return { supported, permission, request, notify };
}
