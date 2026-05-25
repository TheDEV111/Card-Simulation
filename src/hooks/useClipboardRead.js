import { useState, useCallback } from "react";

export function useClipboardRead() {
  const [text, setText] = useState(null);
  const [error, setError] = useState(null);
  const [reading, setReading] = useState(false);
  const supported = typeof navigator !== "undefined" && "clipboard" in navigator && "readText" in navigator.clipboard;

  const read = useCallback(async () => {
    if (!supported) {
      setError("Clipboard read not supported");
      return null;
    }
    setReading(true);
    setError(null);
    try {
      const content = await navigator.clipboard.readText();
      setText(content);
      return content;
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setReading(false);
    }
  }, [supported]);

  const clear = useCallback(() => setText(null), []);

  return { supported, text, error, reading, read, clear };
}
