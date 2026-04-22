import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { formatAddress } from "../../utils/format";
import { cn } from "../../utils/cn";

export default function TruncatedAddress({ address, chars = 6, className }) {
  const { copy, copied } = useCopyToClipboard();
  return (
    <button
      onClick={() => copy(address)}
      className={cn(
        "font-mono text-sm text-white/60 hover:text-white transition-colors duration-150 flex items-center gap-1.5",
        className
      )}
      title={address}
    >
      {formatAddress(address, chars)}
      <span className="text-2xs text-white/30 transition-all duration-150">
        {copied ? "✓" : "⎘"}
      </span>
    </button>
  );
}
