import { useEffect, useRef } from "react";

export function useEventListener(eventName, handler, element = window) {
  const saved = useRef(handler);

  useEffect(() => { saved.current = handler; }, [handler]);

  useEffect(() => {
    const target = element?.current ?? element;
    if (!target?.addEventListener) return;
    const listener = (e) => saved.current(e);
    target.addEventListener(eventName, listener);
    return () => target.removeEventListener(eventName, listener);
  }, [eventName, element]);
}
