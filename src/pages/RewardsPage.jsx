import { useRewards } from "../hooks/useRewards";
import ConnectWalletGate from "../components/ui/ConnectWalletGate";
import PageHeader from "../components/ui/PageHeader";
import AchievementCard from "../components/ui/AchievementCard";
import DailyChallenge from "../components/ui/DailyChallenge";
import StreakBadge from "../components/ui/StreakBadge";
import ProgressBar from "../components/ui/ProgressBar";
import { useGameStats } from "../hooks/useGameStats";

export default function RewardsPage() {
  const { achievements } = useRewards();
  const stats = useGameStats();

  const earned = achievements.filter((a) => a.earned).length;
  const total  = achievements.length;
  const streak = stats?.streak ?? 0;

  return (
    <ConnectWalletGate>
      <div className="max-w-3xl mx-auto px-4 py-6 space-y-8">
        <PageHeader title="Rewards" subtitle="Achievements, challenges, and streaks." />

        {/* Streak */}
        {streak > 0 && (
          <div className="panel p-5 flex items-center gap-4">
            <StreakBadge streak={streak} large />
            <div>
              <p className="text-sm font-semibold text-white">
                {streak}-game winning streak
              </p>
              <p className="text-xs text-white/40">Keep playing to extend it.</p>
            </div>
          </div>
        )}

        {/* Daily challenge */}
        <section className="space-y-4">
          <p className="label-caps">Daily challenge</p>
          <DailyChallenge />
        </section>

        {/* Achievement progress */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="label-caps">Achievements</p>
            <p className="text-xs text-white/40">{earned}/{total}</p>
          </div>
          <ProgressBar value={earned} max={total} color="gold" />
          <div className="grid sm:grid-cols-2 gap-3">
            {achievements.map((a) => (
              <AchievementCard key={a.id} achievement={a} />
            ))}
          </div>
        </section>
      </div>
    </ConnectWalletGate>
  );
}
