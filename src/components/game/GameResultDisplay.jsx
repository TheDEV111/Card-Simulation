import CardFlip from "../ui/CardFlip";
import STXAmount from "../ui/STXAmount";
import TransactionLink from "../ui/TransactionLink";

export default function GameResultDisplay({ result, onPlayAgain }) {
  if (!result) return null;

  const { outcome, card, contractCard, payout, txId } = result;
  const isWin = outcome === "win";

  return (
    <div className={`panel p-8 text-center space-y-6 ${isWin ? "border-win/30" : "border-loss/20"}`}>
      <div className="space-y-2">
        <p className={`text-3xl font-bold ${isWin ? "text-win" : "text-loss"}`} style={{ fontFamily: "Cinzel, serif" }}>
          {isWin ? "You won!" : "You lost"}
        </p>
        <p className="text-sm text-white/40">
          {isWin
            ? `+${<STXAmount ustx={payout} />} — contract drew your suit!`
            : "The contract drew a different suit."}
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
        <div className="flex justify-center">
          <TransactionLink txId={txId} className="text-xs text-white/30 hover:text-gold/60 transition-colors" />
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
