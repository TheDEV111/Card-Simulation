import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";

export default function Copyable({ value, children, className = "" }) {
  const [copied, copy] = useCopyToClipboard();

  return (
    <button
      type="button"
      onClick={() => copy(value)}
      className={`group inline-flex items-center gap-1.5 cursor-pointer ${className}`}
      title={copied ? "Copied!" : "Click to copy"}
    >
      {children}
      <span className="text-white/30 group-hover:text-gold/60 transition-colors text-xs">
        {copied ? "✓" : "⎘"}
      </span>
    </button>
  );
}
