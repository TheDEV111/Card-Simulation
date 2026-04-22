import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import STXAmount from "../ui/STXAmount";
import SuitIcon from "../ui/SuitIcon";

export default function DashboardTopWin() {
  const topWin = useMemo(() => {
    return MOCK_GAMES.filter((g) => g.outcome === "win")
      .sort((a, b) => b.payout - a.payout)[0] ?? null;
  }, []);

  if (!topWin) return null;

  return (
    <div className="panel p-5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">All-Time Best Win</h3>
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <SuitIcon suit={topWin.card} size="lg" />
            <span className="text-xs text-white/40">vs</span>
            <SuitIcon suit={topWin.contractCard} size="lg" />
          </div>
          <p className="text-xs text-white/30">
            {new Date(topWin.timestamp).toLocaleDateString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold text-win" style={{ fontFamily: "Cinzel, serif" }}>
            +<STXAmount ustx={topWin.payout} />
          </p>
          <p className="text-xs text-white/30">Stake: <STXAmount ustx={topWin.stake} /></p>
        </div>
      </div>
    </div>
  );
}
