import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import { formatSTX, formatAddress } from "../../utils/format";
import STXAmount from "../ui/STXAmount";

export default function LandingTopWin() {
  const topWin = useMemo(() => {
    return MOCK_GAMES.filter((g) => g.outcome === "win").sort((a, b) => b.payout - a.payout)[0];
  }, []);

  if (!topWin) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-win/5 border border-win/20">
      <span className="text-xl">🏆</span>
      <div className="min-w-0">
        <p className="text-xs text-white/40">Biggest win</p>
        <p className="text-sm text-white font-semibold truncate">
          <span className="text-win">
            <STXAmount ustx={topWin.payout} />
          </span>
          {" "}by {formatAddress(topWin.player)}
        </p>
      </div>
    </div>
  );
}
