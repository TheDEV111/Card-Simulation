import { useWebShare } from "../../hooks/useWebShare.js";

export function ShareTxButton({ txid, className = "" }) {
  const { supported, sharing, shared, share } = useWebShare();

  if (!supported || !txid) return null;

  const handleShare = () =>
    share({
      title: "Stacks Transaction",
      text: "Check out my Stacks transaction:",
      url: `https://explorer.hiro.so/txid/${txid}`,
    });

  return (
    <button
      onClick={handleShare}
      disabled={sharing}
      className={`text-xs font-medium transition-colors ${className}`}
      style={{ color: shared ? "#22c55e" : "rgba(212,168,75,0.6)", fontFamily: "Barlow, sans-serif" }}
    >
      {shared ? "Shared ✓" : "Share TX"}
    </button>
  );
}
