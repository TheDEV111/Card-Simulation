import { useState, useEffect } from "react";
import { relativeTime, formatDate } from "../../utils/dates";

export default function RelativeTime({ timestamp, className = "" }) {
  const [label, setLabel] = useState(() => relativeTime(timestamp));

  useEffect(() => {
    const interval = setInterval(() => setLabel(relativeTime(timestamp)), 30_000);
    return () => clearInterval(interval);
  }, [timestamp]);

  return (
    <time
      dateTime={new Date(timestamp).toISOString()}
      title={formatDate(timestamp)}
      className={className}
    >
      {label}
    </time>
  );
}
