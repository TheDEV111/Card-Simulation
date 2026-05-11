import { useState, useCallback } from "react";
import { copyToClipboard } from "../utils/clipboard";

export function useCopyText({ duration = 1500 } = {}) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(
    async (text) => {
      const ok = await copyToClipboard(text);
      if (ok) {
        setCopied(true);
        setTimeout(() => setCopied(false), duration);
      }
      return ok;
    },
    [duration]
  );

  return { copied, copy };
}
