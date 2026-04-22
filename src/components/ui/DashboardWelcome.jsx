import { Link } from "react-router-dom";
import WalletAvatar from "./WalletAvatar";
import { formatAddress } from "../../utils/format";
import { ROUTES } from "../../utils/routes";

export default function DashboardWelcome({ address }) {
  const hour  = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";

  return (
    <div className="flex items-center gap-4">
      <WalletAvatar address={address} size={52} />
      <div>
        <p className="text-xs text-white/30">{greeting}</p>
        <p className="text-lg font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          {formatAddress(address)}
        </p>
      </div>
      <Link to={ROUTES.GAME} className="ml-auto btn-primary !w-auto !py-2 !px-5 !text-sm">
        Play now →
      </Link>
    </div>
  );
}
