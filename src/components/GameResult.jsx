const CARD_NAMES = { 1: "Spades ♠", 2: "Hearts ♥", 3: "Diamonds ♦" };

export default function GameResult({ result, txId, onReset }) {
  if (!result) return null;

  const isWin = result.outcome === "win";
  const stx = (result.stake / 1_000_000).toFixed(6).replace(/\.?0+$/, "");
  const payout = (result.payout / 1_000_000).toFixed(6).replace(/\.?0+$/, "");

  return (
    <div
      className={[
        "rounded-2xl p-6 text-center space-y-4 border",
        isWin
          ? "bg-emerald-950/40 border-emerald-500/30"
          : "bg-rose-950/40 border-rose-500/30",
      ].join(" ")}
    >
      <div className="text-5xl">{isWin ? "🎉" : "💸"}</div>

      <div>
        <p
          className={[
            "text-2xl font-bold",
            isWin ? "text-emerald-400" : "text-rose-400",
          ].join(" ")}
        >
          {isWin ? "You Won!" : "You Lost"}
        </p>
        <p className="text-sm text-white/40 mt-1">
          Picked {CARD_NAMES[result.card]} · Contract drew{" "}
          {CARD_NAMES[result.contractCard]}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-xs text-white/30 mb-0.5">Stake</p>
          <p className="text-base font-semibold text-white">{stx} STX</p>
        </div>
        <div className="bg-white/5 rounded-xl p-3">
          <p className="text-xs text-white/30 mb-0.5">
            {isWin ? "Payout" : "Lost"}
          </p>
          <p
            className={[
              "text-base font-semibold",
              isWin ? "text-emerald-400" : "text-rose-400",
            ].join(" ")}
          >
            {isWin ? `+${payout}` : `-${stx}`} STX
          </p>
        </div>
      </div>

      {txId && (
        <p className="text-xs text-white/20 font-mono break-all">
          TX: {txId}
        </p>
      )}

      <button className="btn-primary" onClick={onReset}>
        Play Again
      </button>
    </div>
  );
}
