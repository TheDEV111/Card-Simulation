import { useRef, useCallback } from "react";
import { createRateLimiter } from "../services/rateLimit";

export function useRateLimit({ requests = 10, window = 1000 } = {}) {
  const limiter = useRef(createRateLimiter({ requests, window }));

  const isAllowed = useCallback(() => limiter.current.isAllowed(), []);
  const throttle = useCallback((fn) => limiter.current.throttle(fn), []);

  return { isAllowed, throttle };
}
