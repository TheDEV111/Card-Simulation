import { useGameStats } from "../../hooks/useGameStats";
import WinLossChip from "../ui/WinLossChip";

export default function GameHistoryMini({ limit = 8, className = "" }) {
  const { recentGames } = useGameStats();
  const games = (recentGames ?? []).slice(0, limit);

  if (games.length === 0) return null;

  return (
    <div className={`space-y-2 ${className}`}>
      <p className="text-xs text-white/30">Recent outcomes</p>
      <div className="flex flex-wrap gap-1.5">
        {games.map((g) => (
          <WinLossChip key={g.id} outcome={g.outcome} className="text-[10px]" />
        ))}
      </div>
    </div>
  );
}
