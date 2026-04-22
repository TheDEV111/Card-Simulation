import { MOCK_GAMES } from "../../utils/mockData";
import GameBadge from "./GameBadge";
import { formatAddress, formatRelativeTime } from "../../utils/format";
import STXAmount from "./STXAmount";
import LiveIndicator from "./LiveIndicator";

const RECENT = MOCK_GAMES.slice(0, 6);

export default function GameActivityFeed() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>Live activity</p>
        <LiveIndicator />
      </div>
      <div className="panel divide-y divide-white/5">
        {RECENT.map((g) => (
          <div key={g.id} className="flex items-center gap-3 px-4 py-2.5">
            <GameBadge outcome={g.outcome} />
            <span className="flex-1 text-xs text-white/40 font-mono">{formatAddress(g.player, 5)}</span>
            <STXAmount microSTX={g.stake} size="sm" />
            <span className="text-2xs text-white/20">{formatRelativeTime(g.timestamp)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
