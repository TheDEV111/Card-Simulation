import { useChartData } from "../../hooks/useChartData";
import ChartContainer from "./ChartContainer";
import LineChart from "./LineChart";

export default function PnLChart({ days = 30, className = "" }) {
  const data = useChartData(days);

  const chartData = data.map((d) => ({ label: d.label, value: d.pnl }));
  const totalPnL  = data.reduce((s, d) => s + d.pnl, 0);
  const isPositive = totalPnL >= 0;

  return (
    <ChartContainer
      title={`P&L — ${days} days`}
      subtitle={`${isPositive ? "+" : "−"}${(Math.abs(totalPnL) / 1_000_000).toFixed(2)} STX overall`}
      className={className}
    >
      <LineChart
        data={chartData}
        valueKey="value"
        labelKey="label"
        color={isPositive ? "#34d399" : "#f87171"}
        height={80}
      />
    </ChartContainer>
  );
}
