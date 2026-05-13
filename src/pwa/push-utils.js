export function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
}

export async function subscribeToPush(swRegistration, vapidPublicKey) {
  const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);
  return swRegistration.pushManager.subscribe({
    userVisibleOnly: true,
    applicationServerKey,
  });
}

export async function getExistingSubscription(swRegistration) {
  return swRegistration?.pushManager?.getSubscription() ?? null;
}

export async function unsubscribeFromPush(swRegistration) {
  const subscription = await getExistingSubscription(swRegistration);
  if (!subscription) return false;
  return subscription.unsubscribe();
}

export function serializeSubscription(subscription) {
  const { endpoint, keys } = subscription.toJSON();
  return { endpoint, keys };
}

export function isPushSupported() {
  return "PushManager" in window && "serviceWorker" in navigator && "Notification" in window;
}

export async function checkPushPermission() {
  if (!isPushSupported()) return "unsupported";
  return Notification.permission;
}

export async function requestPushPermission() {
  if (!isPushSupported()) return "denied";
  return Notification.requestPermission();
}
