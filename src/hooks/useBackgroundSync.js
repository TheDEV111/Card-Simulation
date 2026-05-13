import { useState, useCallback, useEffect } from "react";
import { enqueue, getQueue, dequeue, markAttempt, getQueueSize } from "../pwa/sync-queue.js";
import { requestBackgroundSync, isBackgroundSyncSupported } from "../pwa/background-sync.js";
import { useOnlineStatus } from "./useOnlineStatus.js";

export function useBackgroundSync(processor) {
  const [queue, setQueue] = useState(getQueue());
  const [syncing, setSyncing] = useState(false);
  const { isOnline } = useOnlineStatus();

  const refresh = useCallback(() => setQueue(getQueue()), []);

  const add = useCallback((item) => {
    const entry = enqueue(item);
    refresh();
    requestBackgroundSync();
    return entry;
  }, [refresh]);

  const remove = useCallback((id) => {
    dequeue(id);
    refresh();
  }, [refresh]);

  const processAll = useCallback(async () => {
    if (!processor || syncing) return;
    setSyncing(true);
    const items = getQueue();
    for (const item of items) {
      markAttempt(item.id);
      try {
        await processor(item);
        dequeue(item.id);
      } catch {
        if (item.attempts >= 3) dequeue(item.id);
      }
    }
    refresh();
    setSyncing(false);
  }, [processor, syncing, refresh]);

  useEffect(() => {
    if (isOnline && queue.length > 0) processAll();
  }, [isOnline]);

  return {
    queue,
    size: queue.length,
    syncing,
    supported: isBackgroundSyncSupported(),
    add,
    remove,
    processAll,
  };
}
