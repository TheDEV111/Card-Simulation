import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import { relativeTime } from "../../utils/dates";
import STXAmount from "../ui/STXAmount";

export default function RewardsHistory({ className = "" }) {
  const events = useMemo(() => {
    const wins = MOCK_GAMES.filter((g) => g.outcome === "win").slice(0, 6);
    return wins.map((g) => ({
      id: g.id,
      type: "win_bonus",
      label: "Win bonus",
      amount: Math.round(g.payout * 0.01),
      ts: g.timestamp,
    }));
  }, []);

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Points History</h3>
      {events.length === 0 ? (
        <p className="text-xs text-white/30">No reward events yet. Play to earn points.</p>
      ) : (
        <div className="divide-y divide-white/5">
          {events.map((e) => (
            <div key={e.id} className="flex items-center justify-between py-2">
              <div>
                <p className="text-xs text-white/70">{e.label}</p>
                <p className="text-[10px] text-white/30">{relativeTime(e.ts)}</p>
              </div>
              <span className="text-xs font-semibold text-gold">+<STXAmount ustx={e.amount} /></span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
