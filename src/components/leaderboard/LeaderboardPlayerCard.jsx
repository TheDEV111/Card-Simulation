import STXAmount from "../ui/STXAmount";
import TruncatedAddress from "../ui/TruncatedAddress";
import WinLossBar from "../ui/WinLossBar";
import RankBadge from "../ui/RankBadge";
import TrendArrow from "../ui/TrendArrow";

export default function LeaderboardPlayerCard({ player, className = "" }) {
  if (!player) return null;
  const { rank, address, games, wins, losses, winRate, totalPayout, pnl } = player;

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <RankBadge rank={rank} />
            <TruncatedAddress address={address} chars={8} className="text-sm font-mono text-white/70" />
          </div>
          <p className="text-xs text-white/30">{games} games played</p>
        </div>
        <TrendArrow value={pnl > 0 ? 12.5 : -8.3} />
      </div>

      <WinLossBar wins={wins} losses={losses} showLabels />

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: "Win rate", value: `${winRate}%` },
          { label: "Wins",     value: wins },
          { label: "Total won", value: <STXAmount ustx={totalPayout} /> },
        ].map(({ label, value }) => (
          <div key={label} className="text-center">
            <p className="text-sm font-semibold text-white">{value}</p>
            <p className="text-[10px] text-white/30 mt-0.5">{label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
