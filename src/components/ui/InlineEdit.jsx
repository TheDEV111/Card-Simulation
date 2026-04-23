import { useState, useRef, useEffect } from "react";

export default function InlineEdit({ value, onSave, placeholder = "Click to edit", className = "" }) {
  const [editing, setEditing] = useState(false);
  const [draft,   setDraft]   = useState(value);
  const inputRef = useRef(null);

  useEffect(() => {
    if (editing) inputRef.current?.select();
  }, [editing]);

  const commit = () => {
    setEditing(false);
    if (draft !== value) onSave(draft);
  };

  const cancel = () => {
    setEditing(false);
    setDraft(value);
  };

  if (editing) {
    return (
      <input
        ref={inputRef}
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => { if (e.key === "Enter") commit(); if (e.key === "Escape") cancel(); }}
        className={`bg-white/8 text-white/80 text-sm rounded-lg px-2 py-1 border border-white/20 focus:outline-none focus:border-gold/50 ${className}`}
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className={`text-sm text-white/70 hover:text-white/90 hover:bg-white/5 rounded px-1 py-0.5 transition-colors ${className}`}
    >
      {value || <span className="text-white/25">{placeholder}</span>}
    </button>
  );
}
