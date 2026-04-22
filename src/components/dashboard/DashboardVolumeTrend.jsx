import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import TrendArrow from "../ui/TrendArrow";

export default function DashboardVolumeTrend() {
  const { thisWeek, lastWeek, trend } = useMemo(() => {
    const now = Date.now();
    const oneWeek = 7 * 86_400_000;
    const twoWeek = 2 * oneWeek;
    const tw = MOCK_GAMES.filter((g) => Date.now() - new Date(g.timestamp).getTime() < oneWeek).length;
    const lw = MOCK_GAMES.filter((g) => {
      const age = now - new Date(g.timestamp).getTime();
      return age >= oneWeek && age < twoWeek;
    }).length;
    const t = lw === 0 ? 100 : ((tw - lw) / lw) * 100;
    return { thisWeek: tw, lastWeek: lw, trend: t };
  }, []);

  return (
    <div className="panel p-5">
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider mb-3">Weekly Volume</h3>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>{thisWeek}</p>
          <p className="text-xs text-white/30 mt-0.5">games this week</p>
        </div>
        <div className="text-right">
          <TrendArrow value={trend} />
          <p className="text-xs text-white/25 mt-1">vs {lastWeek} last week</p>
        </div>
      </div>
    </div>
  );
}
