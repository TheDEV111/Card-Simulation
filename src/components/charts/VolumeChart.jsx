import { useChartData } from "../../hooks/useChartData";
import ChartContainer from "./ChartContainer";
import BarChart from "./BarChart";

export default function VolumeChart({ days = 14, className = "" }) {
  const data = useChartData(days);

  const chartData = data.map((d) => ({ label: d.label, value: d.volume }));
  const totalVol  = data.reduce((s, d) => s + d.volume, 0);

  return (
    <ChartContainer
      title={`Volume — ${days} days`}
      subtitle={`${(totalVol / 1_000_000).toFixed(0)} STX total wagered`}
      className={className}
    >
      <BarChart
        data={chartData}
        valueKey="value"
        labelKey="label"
        color="bg-white/10"
        activeColor="bg-gold/60"
        height={64}
      />
    </ChartContainer>
  );
}
