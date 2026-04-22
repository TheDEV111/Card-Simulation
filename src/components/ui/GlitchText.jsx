import { useEffect, useState } from "react";
import { useReducedMotion } from "../../hooks/useReducedMotion";

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789♠♦♣";

export default function GlitchText({ text, interval = 3000, duration = 600, className = "" }) {
  const [display, setDisplay] = useState(text);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const outer = setInterval(() => {
      let frame = 0;
      const total = Math.ceil(duration / 40);
      const id = setInterval(() => {
        setDisplay(
          text.split("").map((ch, i) =>
            i < frame / total * text.length ? ch : CHARS[Math.floor(Math.random() * CHARS.length)]
          ).join("")
        );
        frame++;
        if (frame > total) { clearInterval(id); setDisplay(text); }
      }, 40);
    }, interval);
    return () => clearInterval(outer);
  }, [text, interval, duration, reduced]);

  return <span className={className} aria-label={text}>{display}</span>;
}
