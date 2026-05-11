import { useState, useRef } from "react";

export default function ChipInput({
  value = [],
  onChange,
  placeholder = "Add tag…",
  max,
  className = "",
}) {
  const [input, setInput] = useState("");
  const inputRef = useRef(null);

  function add(text) {
    const tag = text.trim();
    if (!tag || value.includes(tag) || (max && value.length >= max)) return;
    onChange?.([...value, tag]);
    setInput("");
  }

  function remove(tag) {
    onChange?.(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e) {
    if ((e.key === "Enter" || e.key === ",") && input) {
      e.preventDefault();
      add(input);
    } else if (e.key === "Backspace" && !input && value.length) {
      remove(value[value.length - 1]);
    }
  }

  return (
    <div
      className={`flex flex-wrap gap-1.5 rounded-lg border border-gray-300 bg-white px-2 py-2 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 dark:border-gray-600 dark:bg-gray-800 ${className}`}
      onClick={() => inputRef.current?.focus()}
    >
      {value.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 rounded-full bg-indigo-100 px-2.5 py-0.5 text-sm font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
        >
          {tag}
          <button
            type="button"
            onClick={() => remove(tag)}
            className="ml-0.5 text-indigo-400 hover:text-indigo-600 dark:hover:text-indigo-200"
          >
            ×
          </button>
        </span>
      ))}
      <input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        onBlur={() => input && add(input)}
        placeholder={(!max || value.length < max) ? placeholder : ""}
        className="min-w-24 flex-1 bg-transparent text-sm text-gray-900 placeholder-gray-400 focus:outline-none dark:text-white"
      />
    </div>
  );
}
