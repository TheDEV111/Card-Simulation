import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import CardFlip from "../ui/CardFlip";

export default function LandingHero() {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 space-y-8">
      {/* Decorative cards */}
      <div className="flex items-end gap-4 mb-2">
        <CardFlip frontCard={1} backCard={1} revealed />
        <CardFlip frontCard={2} backCard={2} revealed />
        <CardFlip frontCard={3} backCard={3} revealed />
      </div>

      <div className="space-y-4 max-w-xl">
        <h1 className="text-5xl font-bold text-white leading-tight" style={{ fontFamily: "Cinzel, serif" }}>
          Pick a card.<br />Win on-chain.
        </h1>
        <p className="text-lg text-white/40 max-w-md mx-auto leading-relaxed">
          A provably fair card game on the Stacks blockchain. Every outcome is
          determined by a smart contract — transparent, instant, yours.
        </p>
      </div>

      <div className="flex items-center gap-4">
        <Link
          to={ROUTES.GAME}
          className="px-8 py-4 rounded-xl bg-gold text-surface font-bold text-base hover:bg-gold-light transition-colors duration-150 active:scale-[0.98]"
          style={{ fontFamily: "Cinzel, serif", letterSpacing: "0.04em" }}
        >
          Play now →
        </Link>
        <Link
          to={ROUTES.HOW_TO_PLAY}
          className="px-6 py-4 rounded-xl border border-white/10 text-white/60 hover:border-gold/30 hover:text-white text-sm transition-all duration-150"
        >
          How it works
        </Link>
      </div>

      <p className="text-xs text-white/20">
        No account. No sign-up. Just your Stacks wallet.
      </p>
    </section>
  );
}
