import { useCopyText } from "../../hooks/useCopyText";
import { truncateMiddle } from "../../utils/text";

export default function AddressTag({ address, chars = 20, explorer, className = "" }) {
  const { copied, copy } = useCopyText();

  if (!address) return null;

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg bg-gray-100 px-2.5 py-1 font-mono text-xs text-gray-700 dark:bg-gray-800 dark:text-gray-300 ${className}`}>
      <span>{truncateMiddle(address, chars)}</span>
      <button
        onClick={() => copy(address)}
        className="opacity-50 hover:opacity-100 transition-opacity"
        title="Copy address"
      >
        {copied ? "✓" : "⎘"}
      </button>
      {explorer && (
        <a
          href={explorer}
          target="_blank"
          rel="noopener noreferrer"
          className="opacity-50 hover:opacity-100 transition-opacity"
          title="View on explorer"
        >
          ↗
        </a>
      )}
    </span>
  );
}
