import { useGameStats } from "../../hooks/useGameStats";
import StreakBadge from "../ui/StreakBadge";

export default function DashboardStreakBanner() {
  const stats = useGameStats();
  const streak = stats?.streak ?? 0;

  if (streak < 2) return null;

  return (
    <div className="flex items-center gap-3 px-5 py-4 rounded-xl bg-gold/8 border border-gold/20">
      <StreakBadge streak={streak} />
      <div>
        <p className="text-sm font-semibold text-white">
          You're on a <span className="text-gold">{streak}-game</span> winning streak!
        </p>
        <p className="text-xs text-white/40">Keep it going — pick another card.</p>
      </div>
    </div>
  );
}
