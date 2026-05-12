import { useState, useRef, useCallback } from "react";

export function useFileDropZone({ onDrop, accept, multiple = true } = {}) {
  const [dragging, setDragging] = useState(false);
  const counterRef = useRef(0);

  const filterFiles = (files) => {
    if (!accept) return files;
    return files.filter((f) => accept.split(",").some((a) => {
      const t = a.trim();
      return t.startsWith(".") ? f.name.endsWith(t) : f.type.match(new RegExp(t.replace("*", ".*")));
    }));
  };

  const onDragEnter = useCallback((e) => {
    e.preventDefault();
    counterRef.current++;
    setDragging(true);
  }, []);

  const onDragLeave = useCallback((e) => {
    e.preventDefault();
    counterRef.current--;
    if (counterRef.current === 0) setDragging(false);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "copy";
  }, []);

  const onDropEvent = useCallback((e) => {
    e.preventDefault();
    counterRef.current = 0;
    setDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const filtered = filterFiles(multiple ? files : files.slice(0, 1));
    if (filtered.length) onDrop?.(filtered);
  }, [onDrop, accept, multiple]);

  return {
    dragging,
    dropZoneProps: { onDragEnter, onDragLeave, onDragOver, onDrop: onDropEvent },
  };
}
