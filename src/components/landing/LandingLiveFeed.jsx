import { useState, useEffect } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import { formatAddress } from "../../utils/format";
import STXAmount from "../ui/STXAmount";
import Badge from "../ui/Badge";

const POOL = MOCK_GAMES.slice(0, 20);

export default function LandingLiveFeed() {
  const [items, setItems] = useState(POOL.slice(0, 4));
  const [idx, setIdx] = useState(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prev) => {
        const next = POOL[idx % POOL.length];
        return [next, ...prev.slice(0, 3)];
      });
      setIdx((i) => i + 1);
    }, 3200);
    return () => clearInterval(interval);
  }, [idx]);

  return (
    <div className="panel p-4 space-y-2">
      <div className="flex items-center gap-2 mb-3">
        <span className="w-1.5 h-1.5 rounded-full bg-win animate-pulse" />
        <p className="text-xs text-white/40 uppercase tracking-widest">Live activity</p>
      </div>
      <div className="space-y-2">
        {items.map((game, i) => (
          <div
            key={`${game.txId}-${i}`}
            className="flex items-center justify-between gap-2 py-1.5 border-b border-white/5 last:border-0"
            style={{ animation: i === 0 ? "fadeInUp 0.3s ease" : undefined }}
          >
            <span className="text-xs text-white/40 font-mono truncate">
              {formatAddress(game.player)}
            </span>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className="text-xs text-white/50">
                <STXAmount ustx={game.stake} />
              </span>
              <Badge variant={game.outcome === "win" ? "win" : "loss"}>
                {game.outcome === "win" ? "W" : "L"}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
