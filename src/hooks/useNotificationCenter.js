import { useState, useEffect, useCallback } from "react";
import {
  getNotifications,
  addNotification,
  markRead,
  markAllRead,
  deleteNotification,
  getUnreadCount,
  clearAll,
} from "../pwa/notification-store.js";

export function useNotificationCenter() {
  const [notifications, setNotifications] = useState(getNotifications);
  const [unread, setUnread] = useState(getUnreadCount);

  const refresh = useCallback(() => {
    setNotifications(getNotifications());
    setUnread(getUnreadCount());
  }, []);

  useEffect(() => {
    window.addEventListener("pwa:notification-added", refresh);
    return () => window.removeEventListener("pwa:notification-added", refresh);
  }, [refresh]);

  const add = useCallback((notif) => {
    const n = addNotification(notif);
    refresh();
    return n;
  }, [refresh]);

  const read = useCallback((id) => { markRead(id); refresh(); }, [refresh]);
  const readAll = useCallback(() => { markAllRead(); refresh(); }, [refresh]);
  const remove = useCallback((id) => { deleteNotification(id); refresh(); }, [refresh]);
  const clear = useCallback(() => { clearAll(); refresh(); }, [refresh]);

  return { notifications, unread, add, read, readAll, remove, clear };
}
