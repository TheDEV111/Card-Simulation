import { useWallet } from "../../context/WalletContext";
import WalletBalance from "../ui/WalletBalance";
import TruncatedAddress from "../ui/TruncatedAddress";
import WalletAvatar from "../ui/WalletAvatar";
import Button from "../ui/Button";

export default function DashboardWalletCard() {
  const { address, disconnect } = useWallet();

  if (!address) {
    return (
      <div className="panel p-5 space-y-3 text-center">
        <p className="text-sm text-white/40">Connect your wallet to see your balance.</p>
      </div>
    );
  }

  return (
    <div className="panel p-5 space-y-4">
      <p className="label-caps">Wallet</p>
      <div className="flex items-center gap-3">
        <WalletAvatar address={address} size="md" />
        <div className="min-w-0">
          <TruncatedAddress address={address} className="text-sm text-white font-medium" />
          <WalletBalance address={address} className="text-xs text-white/40 mt-0.5" />
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={disconnect} className="w-full text-loss/70 hover:text-loss border-loss/20 hover:border-loss/40">
        Disconnect
      </Button>
    </div>
  );
}
