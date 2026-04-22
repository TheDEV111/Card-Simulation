import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import StatRow from "../ui/StatRow";
import STXAmount from "../ui/STXAmount";

export default function DashboardStakeProfile() {
  const stats = useMemo(() => {
    const stakes = MOCK_GAMES.map((g) => g.stake);
    const total  = stakes.reduce((s, v) => s + v, 0);
    const avg    = Math.round(total / stakes.length);
    const min    = Math.min(...stakes);
    const max    = Math.max(...stakes);
    const med    = [...stakes].sort((a, b) => a - b)[Math.floor(stakes.length / 2)];
    return { avg, min, max, med, total };
  }, []);

  return (
    <div className="panel p-5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-2">Stake Profile</h3>
      <div className="divide-y divide-white/5">
        <StatRow label="Average" value={<STXAmount ustx={stats.avg} />} accent />
        <StatRow label="Median"  value={<STXAmount ustx={stats.med} />} />
        <StatRow label="Largest" value={<STXAmount ustx={stats.max} />} />
        <StatRow label="Smallest" value={<STXAmount ustx={stats.min} />} />
      </div>
    </div>
  );
}
