import { createContext, useContext, useCallback, useRef } from "react";

const AnalyticsContext = createContext(null);

export function AnalyticsProvider({ adapter, children }) {
  const adapterRef = useRef(adapter);
  adapterRef.current = adapter;

  const track = useCallback((event, properties = {}) => {
    try {
      adapterRef.current?.track(event, {
        ...properties,
        timestamp: Date.now(),
      });
    } catch {
      // analytics must never crash the app
    }
  }, []);

  const identify = useCallback((userId, traits = {}) => {
    try {
      adapterRef.current?.identify(userId, traits);
    } catch {}
  }, []);

  const page = useCallback((name, properties = {}) => {
    try {
      adapterRef.current?.page(name, properties);
    } catch {}
  }, []);

  return (
    <AnalyticsContext.Provider value={{ track, identify, page }}>
      {children}
    </AnalyticsContext.Provider>
  );
}

export function useAnalytics() {
  const ctx = useContext(AnalyticsContext);
  if (!ctx) throw new Error("useAnalytics requires AnalyticsProvider");
  return ctx;
}
