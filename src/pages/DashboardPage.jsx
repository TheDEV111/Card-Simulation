import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardStatsRow from "../components/dashboard/DashboardStatsRow";
import DashboardStreakBanner from "../components/dashboard/DashboardStreakBanner";
import DashboardWinChart from "../components/dashboard/DashboardWinChart";
import DashboardActivityChart from "../components/dashboard/DashboardActivityChart";
import DashboardRecentGames from "../components/dashboard/DashboardRecentGames";
import DashboardLeaderboardPreview from "../components/dashboard/DashboardLeaderboardPreview";
import DashboardDailyChallenge from "../components/dashboard/DashboardDailyChallenge";
import DashboardAchievementsPreview from "../components/dashboard/DashboardAchievementsPreview";
import DashboardQuickPlay from "../components/dashboard/DashboardQuickPlay";
import DashboardWalletCard from "../components/dashboard/DashboardWalletCard";
import DashboardRankCard from "../components/dashboard/DashboardRankCard";
import DashboardGlobalStats from "../components/dashboard/DashboardGlobalStats";
import DashboardStakeHistory from "../components/dashboard/DashboardStakeHistory";
import DashboardSuitBreakdown from "../components/dashboard/DashboardSuitBreakdown";
import DashboardConnectPrompt from "../components/dashboard/DashboardConnectPrompt";
import DashboardPnLCard from "../components/dashboard/DashboardPnLCard";
import DashboardLastGame from "../components/dashboard/DashboardLastGame";
import DashboardOddsReminder from "../components/dashboard/DashboardOddsReminder";
import DashboardTransactionsFeed from "../components/dashboard/DashboardTransactionsFeed";
import { useWallet } from "../context/WalletContext";

export default function DashboardPage() {
  const { address } = useWallet();

  return (
    <div className="max-w-5xl mx-auto space-y-6 px-4 py-6">
      <DashboardHeader />
      <DashboardGlobalStats />
      <DashboardStreakBanner />

      {!address ? (
        <DashboardConnectPrompt />
      ) : (
        <>
          <DashboardStatsRow />

          <div className="grid lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <DashboardActivityChart />
              <DashboardLastGame />
              <DashboardRecentGames />
            </div>
            <div className="space-y-4">
              <DashboardWalletCard />
              <DashboardPnLCard />
              <DashboardQuickPlay />
              <DashboardRankCard />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardWinChart />
            <DashboardSuitBreakdown />
            <DashboardStakeHistory />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardLeaderboardPreview />
            <DashboardTransactionsFeed />
            <div className="space-y-4">
              <DashboardDailyChallenge />
              <DashboardOddsReminder />
              <DashboardAchievementsPreview />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
