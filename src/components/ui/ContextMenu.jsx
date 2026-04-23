import { useEffect, useRef, useState } from "react";

export default function ContextMenu({ items = [], children }) {
  const [pos, setPos] = useState(null);
  const menuRef = useRef(null);

  const open = (e) => {
    e.preventDefault();
    setPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    const close = () => setPos(null);
    window.addEventListener("click", close);
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") close(); });
    return () => window.removeEventListener("click", close);
  }, []);

  return (
    <div onContextMenu={open} className="contents">
      {children}
      {pos && (
        <div
          ref={menuRef}
          role="menu"
          className="fixed z-50 bg-[#1a1a2e] border border-white/10 rounded-lg shadow-xl py-1 min-w-[140px]"
          style={{ left: pos.x, top: pos.y }}
        >
          {items.map((item, i) => (
            <button
              key={i}
              role="menuitem"
              onClick={() => { item.onClick(); setPos(null); }}
              className="w-full px-4 py-2 text-xs text-left text-white/60 hover:bg-white/8 hover:text-white/90 transition-colors flex items-center gap-2"
            >
              {item.icon && <span>{item.icon}</span>}
              {item.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
