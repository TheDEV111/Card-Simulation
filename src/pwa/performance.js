export function measurePaint() {
  if (!("PerformanceObserver" in window)) return null;
  return new Promise((resolve) => {
    const obs = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries.find((e) => e.name === "first-contentful-paint");
      if (fcp) {
        obs.disconnect();
        resolve({ fcp: fcp.startTime, lcp: null });
      }
    });
    obs.observe({ type: "paint", buffered: true });
  });
}

export function measureLCP() {
  if (!("PerformanceObserver" in window)) return Promise.resolve(null);
  return new Promise((resolve) => {
    let latest = null;
    const obs = new PerformanceObserver((list) => {
      latest = list.getEntries().at(-1)?.startTime ?? null;
    });
    obs.observe({ type: "largest-contentful-paint", buffered: true });
    setTimeout(() => { obs.disconnect(); resolve(latest); }, 5000);
  });
}

export function getNavigationTiming() {
  const entry = performance.getEntriesByType("navigation")[0];
  if (!entry) return null;
  return {
    ttfb: entry.responseStart - entry.requestStart,
    domLoad: entry.domContentLoadedEventEnd - entry.startTime,
    load: entry.loadEventEnd - entry.startTime,
    transferSize: entry.transferSize,
  };
}

export function getResourceCount() {
  return performance.getEntriesByType("resource").length;
}
