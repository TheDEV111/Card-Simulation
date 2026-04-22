import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import ContractInfo from "../ui/ContractInfo";

export default function LandingCTA() {
  return (
    <section className="px-6 py-20 border-t border-white/5">
      <div className="max-w-lg mx-auto text-center space-y-8">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
            Ready to play?
          </h2>
          <p className="text-sm text-white/40">
            Connect your wallet and place your first bet in under a minute.
          </p>
        </div>
        <Link
          to={ROUTES.GAME}
          className="inline-block px-12 py-5 rounded-xl bg-gold text-surface font-bold text-lg hover:bg-gold-light transition-colors duration-150 active:scale-[0.98]"
          style={{ fontFamily: "Cinzel, serif", letterSpacing: "0.04em" }}
        >
          Start playing →
        </Link>
        <div className="pt-4">
          <p className="label-caps mb-4">Contract details</p>
          <ContractInfo />
        </div>
      </div>
    </section>
  );
}
