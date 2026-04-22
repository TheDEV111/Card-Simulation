import { useState } from "react";

export function useCopyToClipboard(timeout = 1500) {
  const [copied, setCopied] = useState(false);

  async function copy(text) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), timeout);
    } catch {
      setCopied(false);
    }
  }

  return { copy, copied };
}
