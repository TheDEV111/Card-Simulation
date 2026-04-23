import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import GlowPulse from "../ui/GlowPulse";

export default function CTABanner({ className = "" }) {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-xl mx-auto text-center">
        <GlowPulse color="oklch(0.83 0.17 85)" size={300} className="mx-auto">
          <div className="panel p-10 space-y-6">
            <p className="text-xs font-semibold text-gold uppercase tracking-widest">Ready to play?</p>
            <h2
              className="text-3xl font-bold text-white"
              style={{ fontFamily: "Cinzel, serif" }}
            >
              Draw your card
            </h2>
            <p className="text-sm text-white/40">
              Connect your wallet and make your first pick. One transaction, instant result.
            </p>
            <Link to={ROUTES.GAME} className="btn-primary px-10 py-3 inline-block">
              Start playing
            </Link>
          </div>
        </GlowPulse>
      </div>
    </section>
  );
}
