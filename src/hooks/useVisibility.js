import { useState, useEffect, useRef } from "react";

export function useVisibility({ threshold = 0, rootMargin = "0px" } = {}) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold, rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return { ref, visible };
}

export function useOnVisible(ref, callback, { once = false } = {}) {
  const fired = useRef(false);

  useEffect(() => {
    const el = ref?.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (once && fired.current) return;
        fired.current = true;
        callback();
        if (once) observer.disconnect();
      }
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, callback, once]);
}
