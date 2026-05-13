import { useState, useCallback } from "react";

export function useUndoRedo(initialValue, { maxHistory = 50 } = {}) {
  const [history, setHistory] = useState([initialValue]);
  const [index, setIndex] = useState(0);

  const value = history[index];

  const set = useCallback((next) => {
    setHistory((prev) => {
      const truncated = prev.slice(0, index + 1);
      const updated = [...truncated, next];
      return updated.length > maxHistory ? updated.slice(1) : updated;
    });
    setIndex((i) => Math.min(i + 1, maxHistory - 1));
  }, [index, maxHistory]);

  const undo = useCallback(() => {
    setIndex((i) => Math.max(0, i - 1));
  }, []);

  const redo = useCallback(() => {
    setIndex((i) => Math.min(history.length - 1, i + 1));
  }, [history.length]);

  const reset = useCallback((val = initialValue) => {
    setHistory([val]);
    setIndex(0);
  }, [initialValue]);

  return {
    value,
    set,
    undo,
    redo,
    reset,
    canUndo: index > 0,
    canRedo: index < history.length - 1,
    historyLength: history.length,
  };
}
