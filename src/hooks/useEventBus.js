import { useEffect, useCallback } from "react";
import { globalBus } from "../utils/event";

export function useEventBus(event, handler) {
  useEffect(() => {
    if (!event || !handler) return;
    return globalBus.on(event, handler);
  }, [event, handler]);
}

export function useEmit(event) {
  return useCallback((...args) => globalBus.emit(event, ...args), [event]);
}
