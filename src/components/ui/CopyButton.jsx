import { useState } from "react";

export default function CopyButton({ text, className = "" }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={`text-xs px-2 py-0.5 rounded transition-colors ${
        copied
          ? "bg-win/20 text-win"
          : "bg-white/5 text-white/40 hover:text-white/70 hover:bg-white/10"
      } ${className}`}
      aria-label={copied ? "Copied" : "Copy to clipboard"}
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}
