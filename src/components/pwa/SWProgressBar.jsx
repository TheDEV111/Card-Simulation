import { useEffect, useState } from "react";

export function SWProgressBar({ active = false }) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!active) { setWidth(0); return; }
    setVisible(true);
    setWidth(15);
    const t1 = setTimeout(() => setWidth(40), 300);
    const t2 = setTimeout(() => setWidth(70), 1000);
    const t3 = setTimeout(() => setWidth(90), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [active]);

  useEffect(() => {
    if (!active && width > 0) {
      setWidth(100);
      const t = setTimeout(() => { setVisible(false); setWidth(0); }, 400);
      return () => clearTimeout(t);
    }
  }, [active, width]);

  if (!visible) return null;

  return (
    <div className="fixed top-0 inset-x-0 z-[200] h-0.5" style={{ background: "rgba(212,168,75,0.1)" }}>
      <div
        className="h-full"
        style={{
          width: `${width}%`,
          background: "#d4a84b",
          transition: "width 0.4s ease-out",
          boxShadow: "0 0 8px #d4a84b",
        }}
      />
    </div>
  );
}
