import { useMemo } from "react";
import { useGameHistory } from "../../hooks/useGameHistory";
import STXAmount from "../ui/STXAmount";
import Badge from "../ui/Badge";
import RelativeTime from "../ui/RelativeTime";

export default function DashboardBestGame() {
  const { games } = useGameHistory();

  const best = useMemo(
    () => games.filter((g) => g.outcome === "win").sort((a, b) => b.payout - a.payout)[0],
    [games]
  );

  if (!best) return null;

  return (
    <div className="panel p-5 space-y-3">
      <p className="label-caps">Best win</p>
      <div className="flex items-center justify-between gap-3">
        <div className="space-y-0.5">
          <p className="text-xl font-bold text-win" style={{ fontFamily: "Cinzel, serif" }}>
            +<STXAmount ustx={best.payout} />
          </p>
          <p className="text-xs text-white/40">
            Staked <STXAmount ustx={best.stake} />
          </p>
        </div>
        <div className="text-right space-y-1">
          <Badge variant="win">Win</Badge>
          <p className="text-xs text-white/30">
            <RelativeTime timestamp={best.timestamp} />
          </p>
        </div>
      </div>
    </div>
  );
}
