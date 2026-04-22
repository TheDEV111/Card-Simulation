import { useState, useRef, useEffect } from "react";

export default function ExpandCollapse({ summary, children, defaultOpen = false, className = "" }) {
  const [open, setOpen] = useState(defaultOpen);
  const contentRef = useRef(null);
  const [height, setHeight] = useState(defaultOpen ? "auto" : 0);

  useEffect(() => {
    if (open) {
      const h = contentRef.current?.scrollHeight ?? 0;
      setHeight(h);
      const t = setTimeout(() => setHeight("auto"), 350);
      return () => clearTimeout(t);
    } else {
      setHeight(contentRef.current?.scrollHeight ?? 0);
      requestAnimationFrame(() => setHeight(0));
    }
  }, [open]);

  return (
    <div className={className}>
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="flex items-center justify-between w-full text-left text-sm text-white/70 hover:text-white transition-colors py-2"
      >
        {summary}
        <span
          className="text-white/30 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "none" }}
          aria-hidden="true"
        >
          ▾
        </span>
      </button>
      <div
        ref={contentRef}
        style={{ height, overflow: "hidden", transition: "height 0.35s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="pb-2">{children}</div>
      </div>
    </div>
  );
}
