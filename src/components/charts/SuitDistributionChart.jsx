import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import ChartContainer from "./ChartContainer";
import DonutChart from "./DonutChart";

const SUIT_COLORS = { 1: "#34d399", 2: "#d4af37", 3: "#f87171" };
const SUIT_NAMES  = { 1: "Spades", 2: "Diamonds", 3: "Clubs" };

export default function SuitDistributionChart({ className = "" }) {
  const segments = useMemo(() => {
    return [1, 2, 3].map((id) => ({
      label: SUIT_NAMES[id],
      value: MOCK_GAMES.filter((g) => g.card === id).length,
      color: SUIT_COLORS[id],
    }));
  }, []);

  const total = segments.reduce((s, seg) => s + seg.value, 0);

  return (
    <ChartContainer title="Suit Distribution" className={className}>
      <div className="flex items-center gap-6">
        <DonutChart segments={segments} size={72} stroke={10} />
        <div className="space-y-1.5">
          {segments.map((s) => (
            <div key={s.label} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
              <span className="text-xs text-white/50">{s.label}</span>
              <span className="text-xs text-white/70 ml-auto pl-4">
                {Math.round((s.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartContainer>
  );
}
