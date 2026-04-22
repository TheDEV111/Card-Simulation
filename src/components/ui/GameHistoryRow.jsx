import CardSymbol from "./CardSymbol";
import GameBadge from "./GameBadge";
import STXAmount from "./STXAmount";
import { formatRelativeTime } from "../../utils/format";

export default function GameHistoryRow({ game }) {
  return (
    <div className="table-row grid grid-cols-[auto_auto_1fr_auto_auto] items-center gap-4 px-4 py-3">
      <GameBadge outcome={game.outcome} />
      <div className="flex items-center gap-2">
        <CardSymbol card={game.card} size="sm" />
        <span className="text-white/20 text-xs">vs</span>
        <CardSymbol card={game.contractCard} size="sm" />
      </div>
      <span className="font-mono text-xs text-white/30 truncate">{game.txId.slice(0, 16)}…</span>
      <div className="text-right space-y-0.5">
        <STXAmount microSTX={game.stake} accent={false} size="sm" />
        {game.outcome === "win" && (
          <p className="text-xs text-win">+<STXAmount microSTX={game.payout - game.stake} accent={false} size="sm" /></p>
        )}
      </div>
      <span className="text-2xs text-white/20 whitespace-nowrap">{formatRelativeTime(game.timestamp)}</span>
    </div>
  );
}
