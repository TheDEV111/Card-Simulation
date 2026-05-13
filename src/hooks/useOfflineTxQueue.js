import { useState, useCallback, useEffect } from "react";
import {
  getTxQueue,
  enqueueTx,
  updateTxStatus,
  removeTx,
  getQueuedTxs,
} from "../pwa/offline-tx-queue.js";
import { useOnlineStatus } from "./useOnlineStatus.js";

export function useOfflineTxQueue(sender) {
  const [queue, setQueue] = useState(getTxQueue());
  const { isOnline } = useOnlineStatus();
  const [flushing, setFlushing] = useState(false);

  const refresh = useCallback(() => setQueue(getTxQueue()), []);

  const add = useCallback((tx) => {
    const entry = enqueueTx(tx);
    refresh();
    return entry;
  }, [refresh]);

  const flush = useCallback(async () => {
    if (!sender || flushing) return;
    setFlushing(true);
    const queued = getQueuedTxs();
    for (const tx of queued) {
      updateTxStatus(tx.id, "pending");
      try {
        const txid = await sender(tx);
        updateTxStatus(tx.id, "broadcast", { txid });
      } catch (err) {
        const retries = (tx.retries ?? 0) + 1;
        updateTxStatus(tx.id, retries >= 3 ? "failed" : "queued", { retries, error: err.message });
      }
    }
    refresh();
    setFlushing(false);
  }, [sender, flushing, refresh]);

  const cancel = useCallback((id) => {
    removeTx(id);
    refresh();
  }, [refresh]);

  useEffect(() => {
    if (isOnline && getQueuedTxs().length > 0) flush();
  }, [isOnline]);

  const queued = queue.filter((t) => t.status === "queued");
  const pending = queue.filter((t) => t.status === "pending");
  const failed = queue.filter((t) => t.status === "failed");

  return { queue, queued, pending, failed, flushing, add, flush, cancel, refresh };
}
