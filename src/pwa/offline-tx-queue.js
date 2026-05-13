import { OFFLINE_QUEUE_KEY } from "./config.js";

export function getTxQueue() {
  try {
    return JSON.parse(localStorage.getItem(OFFLINE_QUEUE_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function enqueueTx(tx) {
  const queue = getTxQueue();
  const entry = {
    id: `tx-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    timestamp: Date.now(),
    status: "queued",
    retries: 0,
    ...tx,
  };
  queue.push(entry);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
  return entry;
}

export function updateTxStatus(id, status, extra = {}) {
  const queue = getTxQueue().map((tx) =>
    tx.id === id ? { ...tx, status, updatedAt: Date.now(), ...extra } : tx
  );
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

export function removeTx(id) {
  const queue = getTxQueue().filter((tx) => tx.id !== id);
  localStorage.setItem(OFFLINE_QUEUE_KEY, JSON.stringify(queue));
}

export function getQueuedTxs() {
  return getTxQueue().filter((tx) => tx.status === "queued");
}

export function getPendingTxs() {
  return getTxQueue().filter((tx) => tx.status === "pending");
}

export function clearTxQueue() {
  localStorage.removeItem(OFFLINE_QUEUE_KEY);
}
