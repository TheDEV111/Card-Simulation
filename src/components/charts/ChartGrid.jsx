import PnLChart from "./PnLChart";
import VolumeChart from "./VolumeChart";
import WinRateChart from "./WinRateChart";
import SuitDistributionChart from "./SuitDistributionChart";
import CumulativePnLChart from "./CumulativePnLChart";
import WinStreakChart from "./WinStreakChart";
import StakeHistogram from "./StakeHistogram";
import SessionHeatmap from "./SessionHeatmap";

export default function ChartGrid({ className = "" }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <PnLChart days={30} />
        <VolumeChart days={14} />
      </div>
      <WinRateChart days={14} />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SuitDistributionChart />
        <StakeHistogram />
      </div>
      <CumulativePnLChart />
      <WinStreakChart />
      <SessionHeatmap />
    </div>
  );
}
