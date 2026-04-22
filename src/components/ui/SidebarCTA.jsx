import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function SidebarCTA() {
  return (
    <div className="mx-3 mb-3 p-3 rounded-xl bg-gold/10 border border-gold/20">
      <p className="text-xs font-semibold text-gold mb-1" style={{ fontFamily: "Cinzel, serif" }}>
        Ready to play?
      </p>
      <p className="text-2xs text-white/30 mb-3">1 in 3 odds. 2× payout. On-chain.</p>
      <Link to={ROUTES.GAME} className="block text-center py-2 rounded-lg bg-gold text-surface text-xs font-semibold hover:bg-gold-light transition-colors"
            style={{ fontFamily: "Cinzel, serif" }}>
        Play now
      </Link>
    </div>
  );
}
