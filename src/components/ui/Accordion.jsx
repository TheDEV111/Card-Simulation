import { useState } from "react";
import { cn } from "../../utils/cn";

export function AccordionItem({ title, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="panel overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-surface-overlay transition-colors duration-150"
      >
        <span className="text-sm font-medium text-white/80">{title}</span>
        <span className={cn("text-gold text-lg leading-none transition-transform duration-200", open ? "rotate-45" : "rotate-0")}>
          +
        </span>
      </button>
      {open && (
        <div className="px-5 pb-5 animate-fade-in">
          <div className="text-sm text-white/50 leading-relaxed">{children}</div>
        </div>
      )}
    </div>
  );
}

export function Accordion({ items }) {
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <AccordionItem key={item.title} title={item.title}>
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
}
