import { useChartData } from "../../hooks/useChartData";

export default function ProfileWinLossTrend({ className = "" }) {
  const data = useChartData(14);

  const maxGames = Math.max(...data.map((d) => d.wins + d.losses), 1);

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Win / Loss — 14 Days</h3>
      <div className="flex items-end gap-1 h-20">
        {data.map((d, i) => {
          const total = d.wins + d.losses;
          const winH  = Math.round((d.wins  / Math.max(total, 1)) * (total / maxGames) * 80);
          const lossH = Math.round((d.losses / Math.max(total, 1)) * (total / maxGames) * 80);
          return (
            <div key={i} className="flex-1 flex flex-col justify-end gap-px" title={`${d.label}: ${d.wins}W / ${d.losses}L`}>
              {winH  > 0 && <div className="bg-win/40  rounded-sm" style={{ height: winH }} />}
              {lossH > 0 && <div className="bg-loss/40 rounded-sm" style={{ height: lossH }} />}
            </div>
          );
        })}
      </div>
      <div className="flex items-center gap-4 text-[10px] text-white/30">
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-win/40" /> Wins</span>
        <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-sm bg-loss/40" /> Losses</span>
      </div>
    </div>
  );
}
