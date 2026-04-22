import { useEffect, useState } from "react";

export default function FlipNumber({ value, className = "" }) {
  const [prev, setPrev] = useState(value);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (value === prev) return;
    setFlipping(true);
    const t = setTimeout(() => { setPrev(value); setFlipping(false); }, 200);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <span
      className={`inline-block tabular-nums transition-all duration-200 ${
        flipping ? "opacity-0 -translate-y-1 scale-95" : "opacity-100 translate-y-0 scale-100"
      } ${className}`}
    >
      {flipping ? prev : value}
    </span>
  );
}
