import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useWinStreak } from "../../hooks/useWinStreak";
import RewardCard from "./RewardCard";

export default function RewardsList({ className = "" }) {
  const { stats } = useProfile();
  const streak = useWinStreak();
  const [claimed, setClaimed] = useState(new Set());

  const games   = stats?.totalGames ?? 0;
  const wins    = stats?.wins ?? 0;
  const staked  = stats?.totalStaked ?? 0;

  const REWARDS = [
    { id: "r1",  icon: "🎮", title: "First Steps",     description: "Play 10 games",          progress: games,              total: 10  },
    { id: "r2",  icon: "🏆", title: "Consistent",      description: "Win 20 games",            progress: wins,               total: 20  },
    { id: "r3",  icon: "🔥", title: "Hot Streak",      description: "Win 5 in a row",          progress: streak.best,        total: 5   },
    { id: "r4",  icon: "💰", title: "High Roller",     description: "Wager 500 STX total",     progress: staked / 1_000_000, total: 500 },
    { id: "r5",  icon: "🃏", title: "Card Shark",      description: "Play 100 games",          progress: games,              total: 100 },
    { id: "r6",  icon: "⚡", title: "Speed Demon",     description: "Play 50 games",           progress: games,              total: 50  },
  ];

  return (
    <div className={`space-y-3 ${className}`}>
      <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Challenges</h3>
      {REWARDS.map((r) => (
        <RewardCard
          key={r.id}
          {...r}
          claimed={claimed.has(r.id)}
          onClaim={() => setClaimed((s) => new Set([...s, r.id]))}
        />
      ))}
    </div>
  );
}
