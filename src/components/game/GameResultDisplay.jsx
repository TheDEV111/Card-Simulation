import CardFlip from "../ui/CardFlip";
import STXAmount from "../ui/STXAmount";
import TransactionLink from "../ui/TransactionLink";
import HashDisplay from "../ui/HashDisplay";

export default function GameResultDisplay({ result, onPlayAgain }) {
  if (!result) return null;

  const { outcome, card, contractCard, payout, txId, stake } = result;
  const isWin = outcome === "win";

  return (
    <div className={`panel p-8 text-center space-y-6 ${isWin ? "ring-1 ring-win/20" : "ring-1 ring-loss/10"}`}>
      <div className="space-y-2">
        <p
          className={`text-4xl font-bold tracking-tight ${isWin ? "text-win" : "text-loss"}`}
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {isWin ? "You won!" : "You lost"}
        </p>
        <p className="text-sm text-white/40">
          {isWin ? "Contract drew your suit — 3× payout!" : "The contract drew a different suit."}
        </p>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="text-center space-y-2">
          <p className="text-xs text-white/30">Your pick</p>
          <CardFlip frontCard={card} backCard={card} revealed />
        </div>
        <div className="text-white/20 text-2xl">vs</div>
        <div className="text-center space-y-2">
          <p className="text-xs text-white/30">Contract drew</p>
          <CardFlip frontCard={contractCard} backCard={contractCard} revealed />
        </div>
      </div>

      <div className="flex items-center justify-center gap-2">
        <p className="text-xl font-semibold text-white">
          {isWin ? "+" : "-"}<STXAmount ustx={isWin ? payout : result.stake} />
        </p>
      </div>

      {txId && (
        <div className="flex justify-center items-center gap-2">
          <span className="text-xs text-white/25">TX</span>
          <HashDisplay hash={txId} chars={6} />
        </div>
      )}

      <button
        type="button"
        onClick={onPlayAgain}
        className="btn-primary"
      >
        Play again
      </button>
    </div>
  );
}
