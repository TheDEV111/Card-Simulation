import { useWallet } from "../../context/WalletContext";
import WalletConnect from "../WalletConnect";

export default function DashboardConnectPrompt() {
  const { address, connect, disconnect } = useWallet();

  if (address) return null;

  return (
    <div className="panel p-8 text-center space-y-4">
      <div className="text-4xl">🔐</div>
      <div className="space-y-1">
        <h2 className="text-lg font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          Connect your wallet
        </h2>
        <p className="text-sm text-white/40">
          Connect to see your personal stats, history, and rank.
        </p>
      </div>
      <div className="flex justify-center">
        <WalletConnect address={address} onConnect={connect} onDisconnect={disconnect} />
      </div>
    </div>
  );
}
