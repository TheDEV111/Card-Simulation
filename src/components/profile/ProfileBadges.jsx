import { useMemo } from "react";
import { useProfile } from "../../hooks/useProfile";
import { useWinStreak } from "../../hooks/useWinStreak";

const BADGE_DEFS = [
  { id: "first_blood",   label: "First Win",      icon: "⚔️",  desc: "Win your first game",           req: (s) => s.wins >= 1 },
  { id: "on_fire",       label: "On Fire",         icon: "🔥",  desc: "Win 3 games in a row",          req: (_, streak) => streak.best >= 3 },
  { id: "veteran",       label: "Veteran",         icon: "🎖️",  desc: "Play 50 games",                 req: (s) => s.totalGames >= 50 },
  { id: "centurion",     label: "Centurion",       icon: "💯",  desc: "Play 100 games",                req: (s) => s.totalGames >= 100 },
  { id: "high_roller",   label: "High Roller",     icon: "💎",  desc: "Stake 100 STX in a single game",req: (s) => s.maxStake >= 100_000_000 },
  { id: "in_the_black",  label: "In the Black",    icon: "📈",  desc: "Finish with positive PnL",      req: (s) => (s.totalPayout - s.totalStaked) > 0 },
  { id: "sharp",         label: "Sharp",           icon: "🎯",  desc: "Achieve 50%+ win rate over 20+ games", req: (s) => s.totalGames >= 20 && s.winRate >= 50 },
  { id: "unbreakable",   label: "Unbreakable",     icon: "🛡️",  desc: "Win streak of 5",               req: (_, streak) => streak.best >= 5 },
  { id: "whale",         label: "Whale",           icon: "🐋",  desc: "Wager 1000 STX total",          req: (s) => s.totalStaked >= 1_000_000_000 },
  { id: "legend",        label: "Legend",          icon: "👑",  desc: "Play 500 games",                req: (s) => s.totalGames >= 500 },
  { id: "lucky_seven",   label: "Lucky Seven",     icon: "🍀",  desc: "Win 7 games in a row",          req: (_, streak) => streak.best >= 7 },
  { id: "diamond_hands", label: "Diamond Hands",   icon: "💍",  desc: "Keep playing after 5 losses",   req: (s) => s.totalGames >= 10 },
];

export default function ProfileBadges({ className = "" }) {
  const { stats } = useProfile();
  const streak = useWinStreak();

  const badges = useMemo(() => {
    if (!stats) return BADGE_DEFS.map((b) => ({ ...b, earned: false }));
    return BADGE_DEFS.map((b) => ({ ...b, earned: b.req(stats, streak) }));
  }, [stats, streak]);

  const earned = badges.filter((b) => b.earned).length;

  return (
    <div className={`panel p-5 space-y-4 ${className}`}>
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider">Badges</h3>
        <span className="text-xs text-white/30">{earned} / {badges.length}</span>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {badges.map((b) => (
          <div
            key={b.id}
            title={b.desc}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-opacity ${
              b.earned ? "opacity-100" : "opacity-25 grayscale"
            }`}
          >
            <span className="text-2xl leading-none">{b.icon}</span>
            <span className="text-[10px] text-white/50 text-center leading-tight">{b.label}</span>
            {b.earned && <span className="w-1 h-1 rounded-full bg-gold" />}
          </div>
        ))}
      </div>
    </div>
  );
}
