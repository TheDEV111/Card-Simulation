import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 px-6">
      <div className="space-y-2">
        <p className="text-8xl font-bold text-gold/20" style={{ fontFamily: "Cinzel, serif" }}>404</p>
        <p className="text-xl font-semibold text-white/40" style={{ fontFamily: "Cinzel, serif" }}>
          Card not found
        </p>
        <p className="text-sm text-white/25 max-w-xs">
          This hand doesn't exist. Head back to the table.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <Link to={ROUTES.HOME} className="btn-ghost">← Home</Link>
        <Link to={ROUTES.GAME} className="btn-primary !w-auto !py-2 !px-5 !text-sm">Play now</Link>
      </div>
    </div>
  );
}
