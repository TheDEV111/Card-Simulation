import { useRef, useState, useEffect } from "react";

export function useIntersection(options = {}) {
  const ref   = useRef(null);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([e]) => setEntry(e), options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [options.threshold, options.root, options.rootMargin]);

  return [ref, entry];
}
