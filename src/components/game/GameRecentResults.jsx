import { useGameHistory } from "../../hooks/useGameHistory";
import Badge from "../ui/Badge";
import { formatSTX } from "../../utils/format";

export default function GameRecentResults() {
  const { games } = useGameHistory();
  const recent = games.slice(0, 5);

  if (recent.length === 0) return null;

  return (
    <div className="panel p-4 space-y-3">
      <p className="label-caps">Recent results</p>
      <div className="flex flex-wrap gap-2">
        {recent.map((game) => (
          <div
            key={game.txId}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-surface-overlay border border-white/8"
          >
            <Badge variant={game.outcome === "win" ? "win" : "loss"} size="xs">
              {game.outcome === "win" ? "W" : "L"}
            </Badge>
            <span className="text-xs text-white/50">{formatSTX(game.stake)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
