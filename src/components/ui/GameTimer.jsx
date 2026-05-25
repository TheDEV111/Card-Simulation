import { useEffect, useState } from "react";
import { formatCountdown } from "../../utils/time";

export default function GameTimer({ durationMs, running = true, onExpire, className = "" }) {
  const [remaining, setRemaining] = useState(durationMs);

  useEffect(() => {
    setRemaining(durationMs);
  }, [durationMs]);

  useEffect(() => {
    if (!running || remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1000) { onExpire?.(); return 0; }
        return r - 1000;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running, remaining, onExpire]);

  const pct = (remaining / durationMs) * 100;
  const urgent = pct < 25;

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <span className={`font-mono text-2xl font-bold tabular-nums ${urgent ? "text-red-500 dark:text-red-400" : "text-gray-900 dark:text-white"}`}>
        {formatCountdown(remaining)}
      </span>
      <div className="h-1 w-32 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${urgent ? "bg-red-500" : "bg-indigo-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
