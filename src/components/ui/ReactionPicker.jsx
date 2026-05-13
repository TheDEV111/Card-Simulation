import { useState } from "react";

const DEFAULT_REACTIONS = [
  { emoji: "👍", label: "Like" },
  { emoji: "❤️", label: "Love" },
  { emoji: "😂", label: "Haha" },
  { emoji: "😮", label: "Wow" },
  { emoji: "😢", label: "Sad" },
  { emoji: "🔥", label: "Fire" },
];

export function ReactionPicker({ reactions = DEFAULT_REACTIONS, counts = {}, onReact }) {
  const [active, setActive] = useState(null);

  const handle = (emoji) => {
    const next = active === emoji ? null : emoji;
    setActive(next);
    onReact?.(next);
  };

  return (
    <div className="flex items-center gap-1">
      {reactions.map(({ emoji, label }) => {
        const count = counts[emoji] ?? 0;
        const isActive = active === emoji;
        return (
          <button
            key={emoji}
            title={label}
            onClick={() => handle(emoji)}
            className={`flex items-center gap-0.5 px-2 py-1 rounded-full text-sm transition-all ${
              isActive
                ? "bg-indigo-100 ring-1 ring-indigo-300 scale-110"
                : "bg-gray-100 hover:bg-gray-200 hover:scale-110"
            }`}
          >
            <span>{emoji}</span>
            {count > 0 && <span className="text-xs font-medium text-gray-600">{count}</span>}
          </button>
        );
      })}
    </div>
  );
}
