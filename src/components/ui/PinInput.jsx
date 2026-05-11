import { useRef, useState } from "react";

export default function PinInput({ length = 4, onComplete, className = "" }) {
  const [values, setValues] = useState(Array(length).fill(""));
  const refs = useRef([]);

  function handleChange(e, i) {
    const ch = e.target.value.replace(/\D/g, "").slice(-1);
    const next = [...values];
    next[i] = ch;
    setValues(next);
    if (ch && i < length - 1) refs.current[i + 1]?.focus();
    if (next.every(Boolean)) onComplete?.(next.join(""));
  }

  function handleKeyDown(e, i) {
    if (e.key === "Backspace" && !values[i] && i > 0) {
      refs.current[i - 1]?.focus();
    }
  }

  function handlePaste(e) {
    e.preventDefault();
    const text = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    const next = Array(length).fill("");
    [...text].forEach((ch, i) => (next[i] = ch));
    setValues(next);
    refs.current[Math.min(text.length, length - 1)]?.focus();
    if (text.length === length) onComplete?.(text);
  }

  return (
    <div className={`flex gap-2 ${className}`} onPaste={handlePaste}>
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          type="text"
          inputMode="numeric"
          value={v}
          maxLength={1}
          onChange={(e) => handleChange(e, i)}
          onKeyDown={(e) => handleKeyDown(e, i)}
          className="h-12 w-12 rounded-lg border border-gray-300 bg-white text-center text-lg font-semibold text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 dark:text-white"
        />
      ))}
    </div>
  );
}
