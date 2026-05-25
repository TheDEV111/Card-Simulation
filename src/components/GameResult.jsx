const CARD_NAMES  = { 1: "Spades ♠", 2: "Hearts ♥", 3: "Diamonds ♦" };
const CARD_SUITS  = { 1: "♠", 2: "♥", 3: "♦" };

function toSTX(micro) {
  return (micro / 1_000_000).toFixed(6).replace(/\.?0+$/, "");
}

export default function GameResult({ result, txId, onReset }) {
  if (!result) return null;

  const isWin = result.outcome === "win";
  const stx    = toSTX(result.stake);
  const payout = toSTX(result.payout);

  return (
    <div className="animate-card-enter space-y-5">
      {/* Outcome header */}
      <div
        className={[
          "rounded-2xl p-6 text-center border",
          isWin
            ? "bg-win/8 border-win/20"
            : "bg-loss/8 border-loss/20",
        ].join(" ")}
      >
        {/* Card reveal */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xs text-white/30 uppercase tracking-widest">You</span>
            <span className={`text-4xl ${result.card !== 1 ? "text-rose-400" : "text-white"}`}>
              {CARD_SUITS[result.card]}
            </span>
          </div>

          <span className="text-white/20 text-xl font-light">vs</span>

          <div className="flex flex-col items-center gap-1">
            <span className="text-2xs text-white/30 uppercase tracking-widest">Contract</span>
            <span className={`text-4xl ${result.contractCard !== 1 ? "text-rose-400" : "text-white"}`}>
              {CARD_SUITS[result.contractCard]}
            </span>
          </div>
        </div>

        <p
          className={[
            "text-xl font-bold tracking-wide",
            isWin ? "text-win" : "text-loss",
          ].join(" ")}
          style={{ fontFamily: "Cinzel, serif" }}
        >
          {isWin ? "You Won" : "You Lost"}
        </p>
        <p className="text-xs text-white/30 mt-1">
          {CARD_NAMES[result.card]} · {CARD_NAMES[result.contractCard]}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-surface-overlay rounded-xl p-4">
          <p className="label-caps mb-1">Stake</p>
          <p className="text-base font-semibold text-white">{stx} <span className="text-xs text-white/40">STX</span></p>
        </div>
        <div className="bg-surface-overlay rounded-xl p-4">
          <p className="label-caps mb-1">{isWin ? "Payout" : "Lost"}</p>
          <p className={`text-base font-semibold ${isWin ? "text-win" : "text-loss"}`}>
            {isWin ? `+${payout}` : `−${stx}`} <span className="text-xs opacity-60">STX</span>
          </p>
        </div>
      </div>

      {txId && (
        <a
          href={`https://explorer.hiro.so/txid/${txId}?chain=mainnet`}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-center text-2xs text-stacks/60 hover:text-stacks transition-colors font-mono truncate"
        >
          {txId.slice(0, 12)}…{txId.slice(-8)} ↗
        </a>
      )}

      <button className="btn-primary" onClick={onReset}>
        Play Again
      </button>
    </div>
  );
}
