import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import NetworkBadge from "../ui/NetworkBadge";
import { useWallet } from "../../context/WalletContext";
import WalletConnect from "../WalletConnect";

export default function LandingNav() {
  const { address, connect, disconnect } = useWallet();
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-white/5">
      <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
        <span className="text-2xl">🃏</span>
        <span className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          Stacks Card Game
        </span>
      </Link>
      <div className="flex items-center gap-3">
        <NetworkBadge />
        <WalletConnect address={address} onConnect={connect} onDisconnect={disconnect} />
      </div>
    </nav>
  );
}
