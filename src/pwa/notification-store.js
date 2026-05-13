const KEY = "pwa:notifications";
const MAX = 50;

export function getNotifications() {
  try { return JSON.parse(localStorage.getItem(KEY) ?? "[]"); } catch { return []; }
}

export function addNotification(notif) {
  const list = getNotifications();
  const entry = { id: `n-${Date.now()}`, timestamp: Date.now(), read: false, ...notif };
  list.unshift(entry);
  localStorage.setItem(KEY, JSON.stringify(list.slice(0, MAX)));
  window.dispatchEvent(new CustomEvent("pwa:notification-added", { detail: entry }));
  return entry;
}

export function markRead(id) {
  const list = getNotifications().map((n) => n.id === id ? { ...n, read: true } : n);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function markAllRead() {
  const list = getNotifications().map((n) => ({ ...n, read: true }));
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function deleteNotification(id) {
  const list = getNotifications().filter((n) => n.id !== id);
  localStorage.setItem(KEY, JSON.stringify(list));
}

export function getUnreadCount() {
  return getNotifications().filter((n) => !n.read).length;
}

export function clearAll() {
  localStorage.removeItem(KEY);
}
