import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import NetworkBadge from "../ui/NetworkBadge";
import { useWallet } from "../../context/WalletContext";
import WalletConnect from "../WalletConnect";

export default function LandingNav() {
  const { address, connect, disconnect } = useWallet();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-40 flex items-center justify-between px-6 py-4 border-b transition-all duration-200 ${
        scrolled
          ? "border-white/10 bg-surface/95 backdrop-blur-sm"
          : "border-white/5 bg-transparent"
      }`}
    >
      <Link to={ROUTES.HOME} className="flex items-center gap-2.5">
        <span className="text-2xl">🃏</span>
        <span className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          Stacks Card Game
        </span>
      </Link>
      <div className="hidden sm:flex items-center gap-4 text-xs text-white/40">
        <Link to={ROUTES.HOW_TO_PLAY} className="hover:text-white/70 transition-colors">How it works</Link>
        <Link to={ROUTES.LEADERBOARD} className="hover:text-white/70 transition-colors">Leaderboard</Link>
      </div>
      <div className="flex items-center gap-3">
        <NetworkBadge />
        <WalletConnect address={address} onConnect={connect} onDisconnect={disconnect} />
      </div>
    </nav>
  );
}
