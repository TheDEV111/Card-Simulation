import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function PlayCTA({ label = "Play now", subtitle }) {
  return (
    <div className="text-center space-y-3">
      <Link to={ROUTES.GAME} className="btn-primary inline-block px-10 py-4 rounded-xl no-underline w-auto">
        {label}
      </Link>
      {subtitle && <p className="text-xs text-white/30">{subtitle}</p>}
    </div>
  );
}
