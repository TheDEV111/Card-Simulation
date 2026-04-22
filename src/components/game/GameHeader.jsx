import { useWallet } from "../../context/WalletContext";
import WalletBalance from "../ui/WalletBalance";
import NetworkBadge from "../ui/NetworkBadge";
import LiveIndicator from "../ui/LiveIndicator";

export default function GameHeader() {
  const { address } = useWallet();

  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <LiveIndicator />
          <h1 className="text-xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
            Card Game
          </h1>
        </div>
        <NetworkBadge />
      </div>
      {address && (
        <WalletBalance address={address} className="text-sm text-white/40" />
      )}
    </div>
  );
}
