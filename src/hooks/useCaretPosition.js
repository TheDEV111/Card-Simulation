import { useState, useCallback } from "react";

export function useCaretPosition(inputRef) {
  const [position, setPosition] = useState({ start: 0, end: 0 });

  const read = useCallback(() => {
    const el = inputRef?.current;
    if (!el) return;
    setPosition({ start: el.selectionStart ?? 0, end: el.selectionEnd ?? 0 });
  }, [inputRef]);

  const set = useCallback((start, end = start) => {
    const el = inputRef?.current;
    if (!el) return;
    el.focus();
    el.setSelectionRange(start, end);
    setPosition({ start, end });
  }, [inputRef]);

  const insert = useCallback((text) => {
    const el = inputRef?.current;
    if (!el) return;
    const { start } = position;
    const value = el.value;
    el.value = value.slice(0, start) + text + value.slice(position.end);
    const next = start + text.length;
    el.setSelectionRange(next, next);
    setPosition({ start: next, end: next });
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, [inputRef, position]);

  return { ...position, read, set, insert };
}
