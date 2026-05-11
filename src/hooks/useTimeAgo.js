import { useState, useEffect } from "react";
import { formatRelativeTime } from "../utils/locale";

export function useTimeAgo(date, { updateInterval = 60_000 } = {}) {
  const [text, setText] = useState(() => formatRelativeTime(new Date(date)));

  useEffect(() => {
    const update = () => setText(formatRelativeTime(new Date(date)));
    update();
    const id = setInterval(update, updateInterval);
    return () => clearInterval(id);
  }, [date, updateInterval]);

  return text;
}
