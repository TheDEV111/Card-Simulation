import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import CardBack from "../ui/CardBack";
import LandingWinRateCallout from "./LandingWinRateCallout";

export default function LandingMobileHero() {
  return (
    <section className="sm:hidden flex flex-col items-center text-center px-5 pt-14 pb-10 space-y-6">
      <div className="flex items-end gap-3">
        <CardBack size="sm" />
        <CardBack size="md" className="mb-1" />
        <CardBack size="sm" />
      </div>

      <div className="space-y-3 max-w-xs">
        <h1 className="text-4xl font-bold text-white leading-tight" style={{ fontFamily: "Cinzel, serif" }}>
          Pick a card.<br />Win on-chain.
        </h1>
        <p className="text-sm text-white/40 leading-relaxed">
          Provably fair card draws on Stacks. Instant payout, no sign-up.
        </p>
      </div>

      <LandingWinRateCallout />

      <Link
        to={ROUTES.GAME}
        className="w-full max-w-xs py-4 rounded-xl bg-gold text-surface font-bold text-center hover:bg-gold-light transition-colors"
        style={{ fontFamily: "Cinzel, serif" }}
      >
        Play now →
      </Link>
    </section>
  );
}
