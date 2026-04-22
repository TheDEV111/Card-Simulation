import { useWallet } from "../../context/WalletContext";
import { formatAddress } from "../../utils/format";
import WalletAvatar from "../ui/WalletAvatar";
import NetworkBadge from "../ui/NetworkBadge";
import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function DashboardHeader() {
  const { address } = useWallet();

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning" :
    hour < 17 ? "Good afternoon" :
    "Good evening";

  return (
    <div className="flex items-start justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        {address && <WalletAvatar address={address} size="lg" />}
        <div>
          <p className="text-xs text-white/40">{greeting}</p>
          <h1
            className="text-2xl font-bold text-white"
            style={{ fontFamily: "Cinzel, serif" }}
          >
            {address ? formatAddress(address) : "Dashboard"}
          </h1>
          <div className="mt-1">
            <NetworkBadge />
          </div>
        </div>
      </div>
      <Link
        to={ROUTES.GAME}
        className="px-5 py-2.5 rounded-xl bg-gold text-surface font-bold text-sm hover:bg-gold-light transition-colors duration-150 flex-shrink-0"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        Play now →
      </Link>
    </div>
  );
}
