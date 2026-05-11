import { useState, useCallback, useRef } from "react";

export function usePointerDrag({ onDrag, onDragEnd } = {}) {
  const [dragging, setDragging] = useState(false);
  const [delta, setDelta] = useState({ x: 0, y: 0 });
  const origin = useRef(null);
  const onDragRef = useRef(onDrag);
  const onDragEndRef = useRef(onDragEnd);
  onDragRef.current = onDrag;
  onDragEndRef.current = onDragEnd;

  const onPointerDown = useCallback((e) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    origin.current = { x: e.clientX, y: e.clientY };
    setDragging(true);
    setDelta({ x: 0, y: 0 });
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!origin.current) return;
    const d = { x: e.clientX - origin.current.x, y: e.clientY - origin.current.y };
    setDelta(d);
    onDragRef.current?.(d);
  }, []);

  const onPointerUp = useCallback((e) => {
    if (!origin.current) return;
    const d = { x: e.clientX - origin.current.x, y: e.clientY - origin.current.y };
    onDragEndRef.current?.(d);
    origin.current = null;
    setDragging(false);
  }, []);

  return {
    dragging,
    delta,
    dragProps: { onPointerDown, onPointerMove, onPointerUp },
  };
}
