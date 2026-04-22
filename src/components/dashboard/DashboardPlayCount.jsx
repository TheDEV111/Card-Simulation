import { useGameStats } from "../../hooks/useGameStats";
import CountUp from "../ui/CountUp";

export default function DashboardPlayCount() {
  const stats = useGameStats();
  const total = stats?.total ?? 0;

  return (
    <div className="flex items-center gap-4 py-4">
      <div className="text-4xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
        <CountUp value={total} duration={1000} />
      </div>
      <div>
        <p className="text-sm font-medium text-white/70">games played</p>
        <p className="text-xs text-white/30">by you, on Stacks</p>
      </div>
    </div>
  );
}
