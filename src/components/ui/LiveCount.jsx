import { useEffect, useState } from "react";

export function LiveCount({ count, label = "watching", pulse = true, className = "" }) {
  const [display, setDisplay] = useState(count);

  useEffect(() => {
    if (count === display) return;
    const step = count > display ? 1 : -1;
    const timer = setInterval(() => {
      setDisplay((prev) => {
        const next = prev + step;
        if ((step > 0 && next >= count) || (step < 0 && next <= count)) {
          clearInterval(timer);
          return count;
        }
        return next;
      });
    }, 30);
    return () => clearInterval(timer);
  }, [count]);

  return (
    <div className={`inline-flex items-center gap-1.5 text-sm ${className}`}>
      {pulse && (
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
        </span>
      )}
      <span className="font-semibold tabular-nums">{display.toLocaleString()}</span>
      <span className="text-gray-500">{label}</span>
    </div>
  );
}
