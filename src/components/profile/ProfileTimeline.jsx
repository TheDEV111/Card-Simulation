import { useGameHistory } from "../../hooks/useGameHistory";
import { relativeTime } from "../../utils/dates";
import STXAmount from "../ui/STXAmount";
import SuitIcon from "../ui/SuitIcon";
import WinLossChip from "../ui/WinLossChip";

export default function ProfileTimeline({ className = "" }) {
  const { games } = useGameHistory({ filter: "all", search: "" });
  const recent = games.slice(0, 8);

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Recent Activity</h3>
      <ol className="relative space-y-0">
        {recent.map((g, i) => (
          <li key={g.id} className="flex gap-3 pb-4 last:pb-0">
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1 ${g.outcome === "win" ? "bg-win" : "bg-loss"}`} />
              {i < recent.length - 1 && <div className="w-px flex-1 bg-white/8 mt-1" />}
            </div>
            <div className="flex-1 min-w-0 pb-0.5">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <SuitIcon suit={g.card} size="sm" />
                  <WinLossChip outcome={g.outcome} />
                </div>
                <span className="text-[10px] text-white/30 flex-shrink-0">{relativeTime(g.timestamp)}</span>
              </div>
              <p className="text-xs text-white/40 mt-0.5">
                Staked <STXAmount ustx={g.stake} /> · {g.outcome === "win" ? "Won" : "Lost"}{" "}
                <span className={g.outcome === "win" ? "text-win" : "text-loss"}>
                  <STXAmount ustx={g.outcome === "win" ? g.payout - g.stake : g.stake} />
                </span>
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
