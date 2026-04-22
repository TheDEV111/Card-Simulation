import { useState, useEffect } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

export default function Typewriter({ text, speed = 40, cursor = true, className = "" }) {
  const reduced = useReducedMotion();
  const [displayed, setDisplayed] = useState(reduced ? text : "");

  useEffect(() => {
    if (reduced) return;
    setDisplayed("");
    let i = 0;
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  }, [text, speed, reduced]);

  return (
    <span className={className}>
      {displayed}
      {cursor && displayed.length < text.length && (
        <span className="inline-block w-0.5 h-4 bg-current align-middle ml-0.5 animate-pulse" aria-hidden="true" />
      )}
    </span>
  );
}
