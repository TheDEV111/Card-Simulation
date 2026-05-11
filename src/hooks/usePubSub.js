import { useEffect, useCallback } from "react";
import { globalPubSub } from "../services/pubsub";

export function usePubSub(channel, handler, { replay = 0 } = {}) {
  useEffect(() => {
    if (!channel || !handler) return;
    return globalPubSub.subscribe(channel, handler, { replay });
  }, [channel, handler, replay]);
}

export function usePublish(channel) {
  return useCallback((message) => globalPubSub.publish(channel, message), [channel]);
}
