import { useCallback } from "react";
import { useAnalytics } from "../context/AnalyticsContext";

export function useTrack(category) {
  const { track } = useAnalytics();

  return useCallback((action, properties = {}) => {
    track(`${category}:${action}`, properties);
  }, [track, category]);
}

export function usePageView(name, properties = {}) {
  const { page } = useAnalytics();
  page(name, properties);
}
