import { useState, useEffect } from "react";

export default function FloatingNav({ items = [], className = "" }) {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      setVisible(y < lastY || y < 80);
      setLastY(y);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <nav
      className={`fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0 pointer-events-none"} ${className}`}
    >
      <div className="flex items-center gap-1 rounded-2xl bg-gray-900/90 px-3 py-2 shadow-2xl backdrop-blur-md dark:bg-white/10">
        {items.map((item, i) => (
          <a
            key={i}
            href={item.href}
            title={item.label}
            className={`flex flex-col items-center gap-0.5 rounded-xl px-3 py-1.5 text-xs transition-colors ${item.active ? "text-white" : "text-gray-400 hover:text-white"}`}
          >
            {item.icon && <span className="text-lg">{item.icon}</span>}
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </nav>
  );
}
