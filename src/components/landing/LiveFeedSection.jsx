import { useRecentActivity } from "../../hooks/useRecentActivity";
import { relativeTime } from "../../utils/dates";
import SuitIcon from "../ui/SuitIcon";
import WinLossChip from "../ui/WinLossChip";
import STXAmount from "../ui/STXAmount";
import TruncatedAddress from "../ui/TruncatedAddress";

export default function LiveFeedSection({ className = "" }) {
  const games = useRecentActivity(8);

  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>Live feed</h2>
          <span className="flex items-center gap-1.5 text-xs text-win">
            <span className="w-1.5 h-1.5 rounded-full bg-win animate-pulse" />
            Live
          </span>
        </div>
        <div className="panel divide-y divide-white/5">
          {games.map((g) => (
            <div key={g.id} className="flex items-center gap-3 px-4 py-3">
              <SuitIcon suit={g.card} size="sm" />
              <TruncatedAddress address={g.address ?? "SP1ABC"} chars={6} className="text-xs font-mono text-white/40 flex-1" />
              <WinLossChip outcome={g.outcome} />
              <span className={`text-xs font-semibold ${g.outcome === "win" ? "text-win" : "text-loss"}`}>
                {g.outcome === "win" ? "+" : "−"}<STXAmount ustx={g.outcome === "win" ? g.payout - g.stake : g.stake} />
              </span>
              <span className="text-[10px] text-white/25 flex-shrink-0">{relativeTime(g.timestamp)}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
