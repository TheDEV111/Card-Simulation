import { useMemo } from "react";
import { useGameStats } from "./useGameStats";

const ACHIEVEMENTS = [
  { id: "first_win",    title: "First Blood",       desc: "Win your first game",               icon: "🎯", target: 1,   stat: "wins"   },
  { id: "ten_wins",     title: "On a Roll",          desc: "Win 10 games",                      icon: "🔥", target: 10,  stat: "wins"   },
  { id: "fifty_wins",   title: "High Roller",        desc: "Win 50 games",                      icon: "🏆", target: 50,  stat: "wins"   },
  { id: "hundred_wins", title: "Card Shark",         desc: "Win 100 games",                     icon: "🦈", target: 100, stat: "wins"   },
  { id: "ten_games",    title: "Getting Started",    desc: "Play 10 games",                     icon: "🃏", target: 10,  stat: "total"  },
  { id: "fifty_games",  title: "Dedicated Player",   desc: "Play 50 games",                     icon: "⭐", target: 50,  stat: "total"  },
  { id: "streak_3",     title: "Hot Streak",         desc: "Win 3 games in a row",              icon: "🌶",  target: 3,   stat: "streak" },
  { id: "streak_5",     title: "Unstoppable",        desc: "Win 5 games in a row",              icon: "⚡", target: 5,   stat: "streak" },
];

export function useRewards() {
  const stats = useGameStats();

  return useMemo(() => {
    if (!stats) return { achievements: [], earned: 0 };

    const achievements = ACHIEVEMENTS.map((a) => {
      const current  = stats[a.stat] ?? 0;
      const progress = Math.min(current / a.target, 1);
      const earned   = progress >= 1;
      return { ...a, current, progress, earned };
    });

    return {
      achievements,
      earned: achievements.filter((a) => a.earned).length,
      total:  achievements.length,
    };
  }, [stats]);
}
