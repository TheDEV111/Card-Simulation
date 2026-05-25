import { useCallback } from "react";
import { trackPWAEvent, getEventCount, exportAnalytics, clearAnalytics } from "../pwa/analytics.js";

export function usePWAAnalytics() {
  const track = useCallback((name, data) => trackPWAEvent(name, data), []);
  const count = useCallback((name) => getEventCount(name), []);
  const exportAll = useCallback(() => exportAnalytics(), []);
  const clear = useCallback(() => clearAnalytics(), []);

  return { track, count, exportAll, clear };
}
