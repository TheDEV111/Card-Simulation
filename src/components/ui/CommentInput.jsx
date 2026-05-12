import { useState, useRef } from "react";

export function CommentInput({ placeholder = "Write a comment…", onSubmit, disabled = false, maxLength = 500 }) {
  const [value, setValue] = useState("");
  const textareaRef = useRef(null);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;
    onSubmit?.(trimmed);
    setValue("");
    if (textareaRef.current) textareaRef.current.style.height = "auto";
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) submit();
  };

  const onInput = (e) => {
    setValue(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <div className="flex gap-3">
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={value}
          onInput={onInput}
          onChange={() => {}}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          rows={1}
          className="w-full resize-none rounded-xl border border-gray-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 disabled:opacity-50 overflow-hidden"
        />
        {value.length > maxLength * 0.8 && (
          <span className="absolute bottom-2 right-3 text-xs text-gray-400">
            {maxLength - value.length}
          </span>
        )}
      </div>
      <button
        onClick={submit}
        disabled={!value.trim() || disabled}
        className="self-end px-4 py-2 rounded-xl bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Post
      </button>
    </div>
  );
}
