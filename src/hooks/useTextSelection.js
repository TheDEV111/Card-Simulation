import { useState, useEffect, useCallback } from "react";

export function useTextSelection(containerRef) {
  const [selection, setSelection] = useState({ text: "", rect: null });

  const read = useCallback(() => {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed || !sel.toString().trim()) {
      setSelection({ text: "", rect: null });
      return;
    }
    if (containerRef?.current && !containerRef.current.contains(sel.anchorNode)) {
      setSelection({ text: "", rect: null });
      return;
    }
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    setSelection({ text: sel.toString(), rect });
  }, [containerRef]);

  useEffect(() => {
    document.addEventListener("selectionchange", read);
    return () => document.removeEventListener("selectionchange", read);
  }, [read]);

  const clear = useCallback(() => {
    window.getSelection()?.removeAllRanges();
    setSelection({ text: "", rect: null });
  }, []);

  return { ...selection, hasSelection: !!selection.text, clear };
}
