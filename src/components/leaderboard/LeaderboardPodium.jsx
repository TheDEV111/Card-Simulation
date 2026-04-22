import { MOCK_LEADERBOARD } from "../../utils/mockData";
import STXAmount from "../ui/STXAmount";
import TruncatedAddress from "../ui/TruncatedAddress";
import GlowPulse from "../ui/GlowPulse";

const medals = ["🥇", "🥈", "🥉"];
const heights = ["h-24", "h-16", "h-20"];
const sizes   = ["text-3xl", "text-xl", "text-2xl"];

export default function LeaderboardPodium({ className = "" }) {
  const [first, second, third] = MOCK_LEADERBOARD.slice(0, 3);
  const order = [second, first, third];
  const podiumOrder = [1, 0, 2];

  return (
    <div className={`flex items-end justify-center gap-2 ${className}`} role="list" aria-label="Top 3 players">
      {order.map((player, i) => {
        const rank = podiumOrder[i] + 1;
        const isFirst = rank === 1;
        return (
          <div key={player?.address} className="flex-1 max-w-[140px]" role="listitem" aria-label={`Rank ${rank}`}>
            {isFirst && (
              <GlowPulse color="gold" className="mb-2">
                <div className="panel p-3 text-center space-y-1 ring-1 ring-gold/30">
                  <span className="text-2xl">{medals[0]}</span>
                  <TruncatedAddress address={player?.address} chars={4} className="text-xs text-gold font-semibold" />
                  <p className="text-xs text-white/50">{player?.wins}W</p>
                  <p className="text-xs text-gold font-bold"><STXAmount ustx={player?.totalPayout ?? 0} /></p>
                </div>
              </GlowPulse>
            )}
            {!isFirst && (
              <div className="panel p-3 text-center space-y-1">
                <span className="text-xl">{medals[rank - 1]}</span>
                <TruncatedAddress address={player?.address} chars={4} className="text-xs text-white/60" />
                <p className="text-xs text-white/40">{player?.wins}W</p>
              </div>
            )}
            <div className={`${heights[rank - 1]} bg-white/5 rounded-t-lg flex items-center justify-center`}>
              <span className={`${sizes[rank - 1]} font-bold text-white/20`} style={{ fontFamily: "Cinzel, serif" }}>
                {rank}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
