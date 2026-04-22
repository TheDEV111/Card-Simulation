import { formatSTX } from "../../utils/format";

const SUIT_LABELS = ["♠ Spades", "♥ Hearts", "♦ Diamonds"];

export default function GamePlayButton({ card, stake, loading, onClick, disabled }) {
  const label = loading
    ? "Broadcasting…"
    : card
    ? `Play ${formatSTX(stake)} on ${SUIT_LABELS[card - 1]}`
    : "Select a suit to play";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading || !card}
      className="btn-primary flex items-center justify-center gap-2"
    >
      {loading && (
        <span className="w-4 h-4 border-2 border-surface/40 border-t-surface rounded-full animate-spin" />
      )}
      {label}
    </button>
  );
}
