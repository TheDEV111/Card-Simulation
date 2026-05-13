import { SYNC_QUEUE_KEY } from "./config.js";

export function getQueue() {
  try {
    return JSON.parse(localStorage.getItem(SYNC_QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function saveQueue(queue) {
  localStorage.setItem(SYNC_QUEUE_KEY, JSON.stringify(queue));
}

export function enqueue(item) {
  const queue = getQueue();
  const entry = { id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, timestamp: Date.now(), attempts: 0, ...item };
  queue.push(entry);
  saveQueue(queue);
  return entry;
}

export function dequeue(id) {
  const queue = getQueue().filter((item) => item.id !== id);
  saveQueue(queue);
}

export function markAttempt(id) {
  const queue = getQueue().map((item) =>
    item.id === id ? { ...item, attempts: item.attempts + 1, lastAttempt: Date.now() } : item
  );
  saveQueue(queue);
}

export function clearQueue() {
  localStorage.removeItem(SYNC_QUEUE_KEY);
}

export function getQueueSize() {
  return getQueue().length;
}
