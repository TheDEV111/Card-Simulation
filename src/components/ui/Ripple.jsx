import { useState, useCallback } from "react";

export default function Ripple({ children, color = "rgba(255,255,255,0.15)", className = "" }) {
  const [ripples, setRipples] = useState([]);

  const addRipple = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    const id = Date.now();
    setRipples((r) => [...r, { id, x, y, size }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  }, []);

  return (
    <div className={`relative overflow-hidden ${className}`} onMouseDown={addRipple}>
      {children}
      {ripples.map((r) => (
        <span
          key={r.id}
          style={{
            position: "absolute", left: r.x, top: r.y, width: r.size, height: r.size,
            borderRadius: "50%", background: color, pointerEvents: "none",
            animation: "ripple 600ms ease-out forwards",
          }}
        />
      ))}
    </div>
  );
}
