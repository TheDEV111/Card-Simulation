import { useState } from "react";

export default function RatingStars({
  value = 0,
  max = 5,
  readOnly = false,
  onChange,
  size = "md",
  className = "",
}) {
  const [hover, setHover] = useState(null);
  const sizes = { sm: "text-base", md: "text-2xl", lg: "text-3xl" };

  return (
    <div
      className={`flex items-center gap-0.5 ${sizes[size]} ${className}`}
      role={readOnly ? "img" : "radiogroup"}
      aria-label={`Rating: ${value} of ${max}`}
    >
      {Array.from({ length: max }, (_, i) => {
        const filled = (hover ?? value) > i;
        return (
          <button
            key={i}
            type="button"
            disabled={readOnly}
            onClick={() => onChange?.(i + 1)}
            onMouseEnter={() => !readOnly && setHover(i + 1)}
            onMouseLeave={() => !readOnly && setHover(null)}
            className={`leading-none transition-transform ${!readOnly ? "hover:scale-110 cursor-pointer" : "cursor-default"} ${filled ? "text-amber-400" : "text-gray-300 dark:text-gray-600"}`}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}
