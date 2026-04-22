import { Link } from "react-router-dom";
import { MOCK_LEADERBOARD } from "../../utils/mockData";
import WalletAvatar from "./WalletAvatar";
import { formatAddress } from "../../utils/format";
import { ROUTES } from "../../utils/routes";

const TOP3 = MOCK_LEADERBOARD.slice(0, 3);

export default function TopPlayersPreview() {
  return (
    <div className="panel divide-y divide-white/5">
      {TOP3.map((p, i) => (
        <div key={p.address} className="flex items-center gap-3 px-4 py-3">
          <span className="w-5 text-xs text-center text-white/30 font-semibold">{i + 1}</span>
          <WalletAvatar address={p.address} size={28} />
          <span className="flex-1 text-sm text-white/60 font-mono">{formatAddress(p.address)}</span>
          <span className="text-xs text-gold font-semibold">{p.wins}W</span>
        </div>
      ))}
      <Link to={ROUTES.LEADERBOARD} className="block px-4 py-3 text-xs text-gold/60 hover:text-gold text-center transition-colors">
        Full leaderboard →
      </Link>
    </div>
  );
}
