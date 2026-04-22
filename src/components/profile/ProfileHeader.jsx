import { useProfile } from "../../hooks/useProfile";
import { usePlayerRank } from "../../hooks/usePlayerRank";
import TruncatedAddress from "../ui/TruncatedAddress";
import RankBadge from "../ui/RankBadge";
import WalletAvatar from "../ui/WalletAvatar";
import CopyButton from "../ui/CopyButton";
import NeonText from "../ui/NeonText";

export default function ProfileHeader({ className = "" }) {
  const { address } = useProfile();
  const { rank, percentile } = usePlayerRank();

  return (
    <div className={`panel p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5 ${className}`}>
      <WalletAvatar address={address} size={64} />
      <div className="flex-1 min-w-0 space-y-2">
        <div className="flex items-center gap-2 flex-wrap">
          {rank && <RankBadge rank={rank} />}
          <NeonText color="gold" className="text-sm font-semibold">Player</NeonText>
        </div>
        <div className="flex items-center gap-2">
          <TruncatedAddress address={address ?? ""} chars={10} className="font-mono text-xs text-white/50" />
          {address && <CopyButton text={address} />}
        </div>
        {percentile && (
          <p className="text-xs text-white/30">Top {100 - percentile + 1}% of players</p>
        )}
      </div>
    </div>
  );
}
