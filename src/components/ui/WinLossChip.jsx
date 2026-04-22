export default function WinLossChip({ outcome, className = "" }) {
  const isWin = outcome === "win";
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-semibold uppercase tracking-wide ${
        isWin ? "bg-win/15 text-win" : "bg-loss/15 text-loss"
      } ${className}`}
    >
      <span aria-hidden="true">{isWin ? "✓" : "✗"}</span>
      {isWin ? "Win" : "Loss"}
    </span>
  );
}
