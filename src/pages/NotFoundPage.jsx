import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6 space-y-6">
      <div className="flex gap-3 opacity-40 text-5xl select-none" aria-hidden>
        <span>♠</span>
        <span>♦</span>
        <span>♣</span>
      </div>
      <div className="space-y-2">
        <p className="label-caps">404</p>
        <h1 className="text-4xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
          Page not found
        </h1>
        <p className="text-sm text-white/40 max-w-xs mx-auto">
          This page doesn't exist. Maybe the card was already drawn.
        </p>
      </div>
      <div className="flex gap-3">
        <Link to={ROUTES.HOME} className="btn-secondary px-6 py-2.5">
          Go home
        </Link>
        <Link to={ROUTES.GAME} className="btn-primary px-6 py-2.5 w-auto">
          Play now
        </Link>
      </div>
    </div>
  );
}
