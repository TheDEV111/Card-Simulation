import { useState, useCallback } from "react";

export function useQueue(initial = []) {
  const [queue, setQueue] = useState(initial);

  const enqueue = useCallback((item) => setQueue((q) => [...q, item]), []);
  const dequeue = useCallback(() => {
    let item;
    setQueue((q) => { item = q[0]; return q.slice(1); });
    return item;
  }, []);
  const clear   = useCallback(() => setQueue([]), []);

  return { queue, enqueue, dequeue, clear, size: queue.length, isEmpty: queue.length === 0 };
}
