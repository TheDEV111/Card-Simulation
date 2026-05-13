import { useState, useEffect, useCallback } from "react";

const toastQueue = [];
const listeners = new Set();

export function showPWAToast({ message, type = "info", duration = 4000 }) {
  const id = Date.now() + Math.random();
  toastQueue.push({ id, message, type, duration });
  listeners.forEach((fn) => fn([...toastQueue]));
}

const TYPE_STYLES = {
  info:    { color: "#d4a84b", bg: "rgba(212,168,75,0.08)",  border: "rgba(212,168,75,0.2)" },
  success: { color: "#22c55e", bg: "rgba(34,197,94,0.08)",   border: "rgba(34,197,94,0.2)" },
  error:   { color: "#ef4444", bg: "rgba(239,68,68,0.08)",   border: "rgba(239,68,68,0.2)" },
  warning: { color: "#f59e0b", bg: "rgba(245,158,11,0.08)",  border: "rgba(245,158,11,0.2)" },
};

function Toast({ id, message, type, onRemove }) {
  const [visible, setVisible] = useState(false);
  const s = TYPE_STYLES[type] ?? TYPE_STYLES.info;

  useEffect(() => {
    const show = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(show);
  }, []);

  const dismiss = useCallback(() => {
    setVisible(false);
    setTimeout(() => onRemove(id), 300);
  }, [id, onRemove]);

  return (
    <div
      onClick={dismiss}
      className="cursor-pointer select-none"
      style={{
        padding: "10px 14px",
        borderRadius: 10,
        background: "#16161e",
        border: `1px solid ${s.border}`,
        boxShadow: "0 4px 20px rgba(0,0,0,0.5)",
        fontFamily: "Barlow, sans-serif",
        fontSize: 13,
        color: s.color,
        display: "flex",
        alignItems: "center",
        gap: 8,
        transition: "all 0.3s ease",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        maxWidth: 320,
      }}
    >
      <span style={{
        width: 6, height: 6, borderRadius: "50%",
        background: s.color, flexShrink: 0,
        boxShadow: `0 0 6px ${s.color}`,
      }} />
      {message}
    </div>
  );
}

export function PWAToastContainer() {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const handler = (q) => setToasts([...q]);
    listeners.add(handler);
    return () => listeners.delete(handler);
  }, []);

  const remove = useCallback((id) => {
    const idx = toastQueue.findIndex((t) => t.id === id);
    if (idx !== -1) toastQueue.splice(idx, 1);
    setToasts([...toastQueue]);
  }, []);

  useEffect(() => {
    toasts.forEach((t) => {
      if (t._timer) return;
      t._timer = setTimeout(() => remove(t.id), t.duration);
    });
  }, [toasts, remove]);

  if (!toasts.length) return null;

  return (
    <div
      style={{
        position: "fixed",
        bottom: 80,
        right: 16,
        zIndex: 300,
        display: "flex",
        flexDirection: "column",
        gap: 8,
        pointerEvents: "none",
      }}
    >
      {toasts.map((t) => (
        <div key={t.id} style={{ pointerEvents: "auto" }}>
          <Toast {...t} onRemove={remove} />
        </div>
      ))}
    </div>
  );
}
