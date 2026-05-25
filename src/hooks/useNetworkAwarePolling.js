import { useEffect, useRef } from "react";
import { useNetworkSpeed } from "./useNetworkSpeed.js";

export function useNetworkAwarePolling(callback, baseInterval = 30000) {
  const { isSlow, isFast } = useNetworkSpeed();
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  const interval = isSlow ? baseInterval * 4 : isFast ? baseInterval : baseInterval * 2;

  useEffect(() => {
    const id = setInterval(() => callbackRef.current(), interval);
    return () => clearInterval(id);
  }, [interval]);
}
