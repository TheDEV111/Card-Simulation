import { useState, useCallback } from "react";

export function useStateHistory(initial, { maxHistory = 50 } = {}) {
  const [history, setHistory] = useState([initial]);
  const [cursor, setCursor] = useState(0);

  const value = history[cursor];

  const push = useCallback((next) => {
    setHistory((h) => {
      const trimmed = h.slice(0, cursor + 1);
      const updated = [...trimmed, next];
      return updated.length > maxHistory ? updated.slice(-maxHistory) : updated;
    });
    setCursor((c) => Math.min(c + 1, maxHistory - 1));
  }, [cursor, maxHistory]);

  const undo = useCallback(() => setCursor((c) => Math.max(0, c - 1)), []);
  const redo = useCallback(() => setCursor((c) => Math.min(history.length - 1, c + 1)), [history.length]);
  const reset = useCallback(() => { setHistory([initial]); setCursor(0); }, [initial]);

  const canUndo = cursor > 0;
  const canRedo = cursor < history.length - 1;

  return { value, push, undo, redo, reset, canUndo, canRedo, history, cursor };
}
