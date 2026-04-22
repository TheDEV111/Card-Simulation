import CardSymbol from "./CardSymbol";
import STXAmount from "./STXAmount";
import PnLDisplay from "./PnLDisplay";
import { cn } from "../../utils/cn";

export default function GameResultCard({ result, onReset }) {
  const isWin = result.outcome === "win";
  return (
    <div className={cn(
      "panel p-6 space-y-6 text-center",
      isWin ? "shadow-win-glow" : "shadow-loss-glow"
    )}>
      <div className="space-y-1">
        <p className={cn("text-4xl font-bold", isWin ? "text-win" : "text-loss")}
           style={{ fontFamily: "Cinzel, serif" }}>
          {isWin ? "You Win!" : "You Lose"}
        </p>
        <p className="text-sm text-white/40">
          {isWin ? "The cards matched — well played." : "Better luck next hand."}
        </p>
      </div>

      <div className="flex items-center justify-center gap-8">
        <div className="space-y-1">
          <p className="label-caps">Your pick</p>
          <CardSymbol card={result.card} size="xl" />
        </div>
        <span className="text-2xl text-white/20">vs</span>
        <div className="space-y-1">
          <p className="label-caps">Contract drew</p>
          <CardSymbol card={result.contractCard} size="xl" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-surface-overlay rounded-xl p-3 space-y-0.5">
          <p className="label-caps">Staked</p>
          <STXAmount microSTX={result.stake} />
        </div>
        <div className="bg-surface-overlay rounded-xl p-3 space-y-0.5">
          <p className="label-caps">P&amp;L</p>
          <PnLDisplay microSTX={result.payout - result.stake} />
        </div>
      </div>

      <button className="btn-primary" onClick={onReset}>Play again</button>
    </div>
  );
}
