import { sendSWMessage } from "./sw-register.js";

const pending = new Map();
let msgId = 0;

export function postToSW(type, payload = {}) {
  sendSWMessage(type, payload);
}

export function querySW(type, payload = {}) {
  return new Promise((resolve, reject) => {
    const channel = new MessageChannel();
    const id = ++msgId;
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`SW query timeout: ${type}`));
    }, 5000);

    channel.port1.onmessage = (e) => {
      clearTimeout(timer);
      pending.delete(id);
      resolve(e.data);
    };

    const controller = navigator.serviceWorker?.controller;
    if (!controller) {
      clearTimeout(timer);
      reject(new Error("No active service worker"));
      return;
    }

    controller.postMessage({ type, id, ...payload }, [channel.port2]);
  });
}

export async function getSWVersion() {
  try {
    const { version } = await querySwSW("GET_VERSION");
    return version;
  } catch {
    return null;
  }
}

export function broadcastToSW(type, data = {}) {
  if (!("serviceWorker" in navigator)) return;
  navigator.serviceWorker.ready.then((reg) => {
    reg.active?.postMessage({ type, ...data });
  });
}
