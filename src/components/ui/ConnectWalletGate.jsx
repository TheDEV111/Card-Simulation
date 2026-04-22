import { useWallet } from "../../context/WalletContext";
import WalletConnect from "../WalletConnect";

export default function ConnectWalletGate({ children }) {
  const { address, connect, disconnect } = useWallet();

  if (!address) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-6 text-center space-y-6">
        <div className="text-6xl opacity-30 select-none">🔒</div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-white/60" style={{ fontFamily: "Cinzel, serif" }}>
            Connect your wallet
          </p>
          <p className="text-sm text-white/30 max-w-xs">
            You need a Stacks wallet to view this page. Connect to get started.
          </p>
        </div>
        <WalletConnect address={address} onConnect={connect} onDisconnect={disconnect} />
      </div>
    );
  }

  return <>{children}</>;
}
