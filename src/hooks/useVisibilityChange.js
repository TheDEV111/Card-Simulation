import { useState, useEffect, useCallback } from "react";

export function useVisibilityChange({ onVisible, onHidden } = {}) {
  const [visible, setVisible] = useState(!document.hidden);
  const [hiddenAt, setHiddenAt] = useState(null);

  const handleChange = useCallback(() => {
    const isVisible = !document.hidden;
    setVisible(isVisible);
    if (!isVisible) {
      setHiddenAt(Date.now());
      onHidden?.();
    } else {
      const away = hiddenAt ? Date.now() - hiddenAt : 0;
      onVisible?.({ awayMs: away });
      setHiddenAt(null);
    }
  }, [onVisible, onHidden, hiddenAt]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleChange);
    return () => document.removeEventListener("visibilitychange", handleChange);
  }, [handleChange]);

  return { visible, hidden: !visible, hiddenAt };
}
