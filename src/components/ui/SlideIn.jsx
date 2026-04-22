import { useEffect, useState } from "react";

export default function SlideIn({ show, from = "bottom", children, className = "" }) {
  const [mounted, setMounted] = useState(show);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (show) { setMounted(true); requestAnimationFrame(() => setVisible(true)); }
    else { setVisible(false); const t = setTimeout(() => setMounted(false), 300); return () => clearTimeout(t); }
  }, [show]);

  if (!mounted) return null;

  const origins = {
    bottom: visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
    top:    visible ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
    left:   visible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0",
    right:  visible ? "translate-x-0 opacity-100" : "translate-x-4 opacity-0",
  };

  return (
    <div className={`transition-all duration-300 ease-out ${origins[from] ?? origins.bottom} ${className}`}>
      {children}
    </div>
  );
}
