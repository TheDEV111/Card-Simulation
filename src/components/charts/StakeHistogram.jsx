import { useMemo } from "react";
import { MOCK_GAMES } from "../../utils/mockData";
import ChartContainer from "./ChartContainer";

const BUCKETS = [
  { label: "1–5",    min: 1_000_000,   max: 5_000_000   },
  { label: "5–10",   min: 5_000_000,   max: 10_000_000  },
  { label: "10–25",  min: 10_000_000,  max: 25_000_000  },
  { label: "25–50",  min: 25_000_000,  max: 50_000_000  },
  { label: "50+",    min: 50_000_000,  max: Infinity    },
];

export default function StakeHistogram({ className = "" }) {
  const buckets = useMemo(() => {
    return BUCKETS.map((b) => ({
      ...b,
      count: MOCK_GAMES.filter((g) => g.stake >= b.min && g.stake < b.max).length,
    }));
  }, []);

  const maxCount = Math.max(...buckets.map((b) => b.count), 1);

  return (
    <ChartContainer title="Stake Distribution" subtitle="Games by stake range (STX)" className={className}>
      <div className="flex items-end gap-1.5 h-16">
        {buckets.map((b) => (
          <div key={b.label} className="flex-1 flex flex-col items-center gap-1" title={`${b.label} STX: ${b.count} games`}>
            <div
              className="w-full rounded-sm bg-white/15 hover:bg-white/25 transition-colors"
              style={{ height: `${Math.max(4, Math.round((b.count / maxCount) * 64))}px` }}
            />
            <span className="text-[9px] text-white/25">{b.label}</span>
          </div>
        ))}
      </div>
    </ChartContainer>
  );
}
