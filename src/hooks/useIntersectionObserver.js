import { useState, useEffect, useRef } from "react";

export function useIntersectionObserver(options = {}) {
  const ref = useRef(null);
  const [entry, setEntry] = useState(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => setEntry(e), options);
    observer.observe(el);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.threshold, options.root, options.rootMargin]);

  return { ref, entry, isIntersecting: entry?.isIntersecting ?? false };
}

export function useLazyLoad(options = {}) {
  const { ref, isIntersecting } = useIntersectionObserver({ ...options, triggerOnce: true });
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    if (isIntersecting) setHasLoaded(true);
  }, [isIntersecting]);

  return { ref, isVisible: isIntersecting, hasLoaded };
}
