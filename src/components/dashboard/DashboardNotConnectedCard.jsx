import { useWallet } from "../../context/WalletContext";
import WalletConnect from "../WalletConnect";

export default function DashboardNotConnectedCard({ title, description }) {
  const { address, connect, disconnect } = useWallet();

  if (address) return null;

  return (
    <div className="panel p-6 text-center space-y-3">
      <p className="text-sm text-white/50">{title}</p>
      {description && <p className="text-xs text-white/30">{description}</p>}
      <div className="flex justify-center">
        <WalletConnect address={address} onConnect={connect} onDisconnect={disconnect} />
      </div>
    </div>
  );
}
