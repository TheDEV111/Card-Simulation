import { useProfile } from "../hooks/useProfile";
import ConnectWalletGate from "../components/ui/ConnectWalletGate";
import ProfileHeader from "../components/ui/ProfileHeader";
import StatsGrid from "../components/ui/StatsGrid";
import WinRateDonut from "../components/ui/WinRateDonut";
import MiniWinChart from "../components/ui/MiniWinChart";
import RankBadge from "../components/ui/RankBadge";
import AchievementCard from "../components/ui/AchievementCard";
import PnLDisplay from "../components/ui/PnLDisplay";
import STXAmount from "../components/ui/STXAmount";
import { formatSTX } from "../utils/format";

export default function ProfilePage() {
  const { address, stats, rank, achievements } = useProfile();
  const earned = achievements.filter((a) => a.earned);

  return (
    <ConnectWalletGate>
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
        {/* Header */}
        <ProfileHeader address={address} stats={stats} rank={rank} />

        {/* Overview grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total games",  value: stats?.total ?? 0 },
            { label: "Win rate",     value: `${Math.round((stats?.winRate ?? 0) * 100)}%` },
            { label: "Best streak",  value: `${stats?.streak ?? 0}×` },
            { label: "Global rank",  value: rank ? `#${rank}` : "—" },
          ].map(({ label, value }) => (
            <div key={label} className="panel p-4 text-center">
              <p className="text-2xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>{value}</p>
              <p className="text-xs text-white/40 mt-1">{label}</p>
            </div>
          ))}
        </div>

        {/* Charts row */}
        <div className="grid sm:grid-cols-2 gap-6">
          <div className="panel p-5 space-y-4">
            <p className="label-caps">Win/loss breakdown</p>
            <div className="flex items-center gap-6">
              <WinRateDonut winRate={stats?.winRate ?? 0} wins={stats?.wins ?? 0} losses={stats?.losses ?? 0} />
              <div className="space-y-2 flex-1">
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Wins</span>
                  <span className="text-win font-semibold">{stats?.wins ?? 0}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Losses</span>
                  <span className="text-loss font-semibold">{stats?.losses ?? 0}</span>
                </div>
                <div className="h-px bg-white/5" />
                <div className="flex justify-between text-sm">
                  <span className="text-white/50">Net P&L</span>
                  <PnLDisplay value={stats?.pnl ?? 0} size="sm" />
                </div>
              </div>
            </div>
          </div>
          <div className="panel p-5 space-y-4">
            <p className="label-caps">Last 20 games</p>
            <MiniWinChart games={stats?.recent ?? []} fullWidth />
            <div className="flex justify-between text-xs text-white/30">
              <span>Oldest</span>
              <span>Most recent</span>
            </div>
          </div>
        </div>

        {/* P&L stats */}
        <div className="panel p-5 space-y-4">
          <p className="label-caps">Financial summary</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: "Total staked",  value: <STXAmount ustx={stats?.totalStaked ?? 0} /> },
              { label: "Total payout",  value: <STXAmount ustx={stats?.totalPayout ?? 0} /> },
              { label: "Net profit",    value: <PnLDisplay value={stats?.pnl ?? 0} size="sm" /> },
            ].map(({ label, value }) => (
              <div key={label} className="text-center space-y-1">
                <p className="text-xs text-white/40">{label}</p>
                <div className="text-sm font-semibold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements */}
        {achievements.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="label-caps">Achievements</p>
              <p className="text-xs text-white/30">{earned.length}/{achievements.length} earned</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              {achievements.map((a) => (
                <AchievementCard key={a.id} achievement={a} />
              ))}
            </div>
          </div>
        )}
      </div>
    </ConnectWalletGate>
  );
}
