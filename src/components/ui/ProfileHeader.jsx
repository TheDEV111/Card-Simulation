import WalletAvatar from "./WalletAvatar";
import TruncatedAddress from "./TruncatedAddress";
import StreakBadge from "./StreakBadge";

export default function ProfileHeader({ address, streak }) {
  return (
    <div className="flex items-center gap-5 panel p-6">
      <WalletAvatar address={address} size={64} />
      <div className="space-y-2">
        <TruncatedAddress address={address} chars={8} className="text-base" />
        {streak > 0 && <StreakBadge streak={streak} />}
      </div>
    </div>
  );
}
