import { useEffect, useRef } from "react";

export function useMutationObserver(ref, callback, options = { childList: true, subtree: true }) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new MutationObserver((mutations) => callbackRef.current(mutations));
    observer.observe(el, options);
    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref, options.childList, options.subtree, options.attributes, options.characterData]);
}
