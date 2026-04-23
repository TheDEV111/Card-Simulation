import { useMemo } from "react";
import { useChartData } from "../../hooks/useChartData";
import ChartContainer from "./ChartContainer";
import AreaChart from "./AreaChart";
import ChartLegend from "./ChartLegend";

export default function WinRateChart({ days = 14, className = "" }) {
  const data = useChartData(days);

  const chartData = useMemo(() =>
    data.map((d) => ({
      label:   d.label,
      wins:    d.wins,
      losses:  d.losses,
    })),
  [data]);

  const legend = (
    <ChartLegend
      items={[
        { label: "Wins",   color: "#34d399" },
        { label: "Losses", color: "#f87171" },
      ]}
    />
  );

  return (
    <ChartContainer
      title={`Wins vs Losses — ${days} days`}
      legend={legend}
      className={className}
    >
      <AreaChart
        data={chartData}
        keys={["wins", "losses"]}
        colors={["#34d399", "#f87171"]}
        height={80}
      />
    </ChartContainer>
  );
}
