import { useClipboard } from "../../hooks/useClipboard";

export default function GameShareResult({ result, className = "" }) {
  const { copy, copied } = useClipboard();

  if (!result) return null;

  const shareText = result.outcome === "win"
    ? `I just won ${(result.payout / 1_000_000).toFixed(2)} STX on Stacks Card Game! 🎉 Play at ${window.location.origin}`
    : `Tried my luck at Stacks Card Game. The odds will turn! 🃏 ${window.location.origin}`;

  return (
    <button
      onClick={() => copy(shareText)}
      className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
        copied ? "bg-win/20 text-win" : "bg-white/6 text-white/40 hover:bg-white/10"
      } ${className}`}
    >
      {copied ? "Copied to clipboard!" : "Share result"}
    </button>
  );
}
