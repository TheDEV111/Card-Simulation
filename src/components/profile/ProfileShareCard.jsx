import { useProfile } from "../../hooks/useProfile";
import { usePlayerRank } from "../../hooks/usePlayerRank";
import { useClipboard } from "../../hooks/useClipboard";
import TruncatedAddress from "../ui/TruncatedAddress";

export default function ProfileShareCard({ className = "" }) {
  const { stats, address } = useProfile();
  const { rank, total } = usePlayerRank();
  const { copy, copied } = useClipboard();

  if (!stats || !address) return null;

  const shareText = `My Stacks Card Game stats:\n🎮 ${stats.totalGames} games\n🏆 ${stats.winRate}% win rate\n📍 Rank ${rank ?? "?"} of ${total}\n🔗 ${window.location.origin}`;

  return (
    <div className={`panel p-5 flex items-center justify-between gap-4 ${className}`}>
      <div className="space-y-0.5">
        <TruncatedAddress address={address} chars={8} className="text-xs font-mono text-white/40" />
        <p className="text-sm text-white/60">
          {stats.totalGames} games · {stats.winRate}% win rate
          {rank && ` · Rank ${rank}`}
        </p>
      </div>
      <button
        onClick={() => copy(shareText)}
        className={`flex-shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
          copied ? "bg-win/20 text-win" : "bg-white/8 text-white/40 hover:bg-white/12"
        }`}
      >
        {copied ? "Copied!" : "Share"}
      </button>
    </div>
  );
}
