import { useMemo } from "react";
import { useGameStats } from "../../hooks/useGameStats";
import { formatSTX } from "../../utils/format";
import STXAmount from "../ui/STXAmount";

export default function DashboardStakeHistory() {
  const stats = useGameStats();

  const items = useMemo(() => [
    { label: "Total staked",  value: stats?.totalStaked  ?? 0, highlight: false },
    { label: "Total payout",  value: stats?.totalPayout  ?? 0, highlight: true  },
    { label: "Avg stake",     value: stats?.total > 0 ? Math.round((stats?.totalStaked ?? 0) / stats.total) : 0, highlight: false },
    { label: "Biggest win",   value: stats?.recent?.filter((g) => g.outcome === "win").sort((a,b) => b.payout - a.payout)[0]?.payout ?? 0, highlight: true },
  ], [stats]);

  return (
    <div className="panel p-5 space-y-4">
      <p className="label-caps">Stake history</p>
      <div className="space-y-3">
        {items.map(({ label, value, highlight }) => (
          <div key={label} className="flex items-center justify-between">
            <span className="text-xs text-white/50">{label}</span>
            <span className={`text-sm font-semibold ${highlight ? "text-win" : "text-white"}`}>
              <STXAmount ustx={value} />
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
