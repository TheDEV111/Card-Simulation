import { useWinStreak } from "../../hooks/useWinStreak";
import NeonText from "../ui/NeonText";
import { streakLabel } from "../../utils/game";

export default function GameStreakAlert({ className = "" }) {
  const { current, isOnStreak } = useWinStreak();
  if (!isOnStreak || current < 2) return null;

  const label = streakLabel(current);

  return (
    <div className={`flex items-center gap-2.5 px-4 py-3 rounded-xl bg-win/8 border border-win/20 ${className}`}>
      <span aria-hidden="true" className="text-lg">🔥</span>
      <NeonText color="win" className="text-sm font-semibold">{label}</NeonText>
      <span className="text-xs text-white/30">You're on fire!</span>
    </div>
  );
}
