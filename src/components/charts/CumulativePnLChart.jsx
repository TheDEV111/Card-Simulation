import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import ChartContainer from "./ChartContainer";
import LineChart from "./LineChart";

export default function CumulativePnLChart({ className = "" }) {
  const data = useMemo(() => {
    const sorted = [...MOCK_GAMES].sort((a, b) => a.timestamp - b.timestamp);
    let cumulative = 0;
    return sorted.map((g, i) => {
      cumulative += g.outcome === "win" ? g.payout - g.stake : -g.stake;
      return { label: `Game ${i + 1}`, value: cumulative };
    });
  }, []);

  const final = data.at(-1)?.value ?? 0;
  const isUp  = final >= 0;

  return (
    <ChartContainer
      title="Cumulative P&L"
      subtitle={`${isUp ? "+" : "−"}${(Math.abs(final) / 1_000_000).toFixed(2)} STX lifetime`}
      className={className}
    >
      <LineChart
        data={data}
        valueKey="value"
        labelKey="label"
        color={isUp ? "#34d399" : "#f87171"}
        height={80}
      />
    </ChartContainer>
  );
}
