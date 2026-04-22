import { useState, useEffect } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import { formatAddress } from "../../utils/format";
import STXAmount from "../ui/STXAmount";

const ITEMS = MOCK_GAMES.filter((g) => g.outcome === "win").slice(0, 10);

export default function GameTicker() {
  const [idx, setIdx] = useState(0);
  const item = ITEMS[idx % ITEMS.length];

  useEffect(() => {
    const t = setInterval(() => setIdx((i) => i + 1), 4000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="flex items-center gap-2 py-2 px-3 rounded-lg bg-win/5 border border-win/15 overflow-hidden">
      <span className="w-1.5 h-1.5 rounded-full bg-win animate-pulse flex-shrink-0" />
      <p className="text-xs text-white/50 truncate">
        <span className="text-win font-medium">{formatAddress(item.player)}</span>
        {" won "}
        <span className="text-win font-semibold">
          <STXAmount ustx={item.payout} />
        </span>
      </p>
    </div>
  );
}
