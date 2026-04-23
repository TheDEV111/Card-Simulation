import { useRef, useState, useEffect } from "react";

export default function Popover({ trigger, children, placement = "bottom", className = "" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const placements = {
    bottom: "top-full mt-2 left-0",
    top:    "bottom-full mb-2 left-0",
    right:  "left-full ml-2 top-0",
    left:   "right-full mr-2 top-0",
  };

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <div onClick={() => setOpen((o) => !o)}>{trigger}</div>
      {open && (
        <div
          className={`absolute z-50 bg-[#1a1a2e] border border-white/10 rounded-xl shadow-xl p-4 min-w-[200px] ${placements[placement] ?? placements.bottom}`}
        >
          {children}
        </div>
      )}
    </div>
  );
}
