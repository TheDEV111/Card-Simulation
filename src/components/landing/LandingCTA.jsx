import { Link } from "react-router-dom";
import { ROUTES } from "../../utils/routes";
import ContractInfo from "../ui/ContractInfo";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle } from "../../utils/animation";
import LandingTopWin from "./LandingTopWin";
import LandingSocialLinks from "./LandingSocialLinks";

export default function LandingCTA() {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="px-6 py-20 border-t border-white/5">
      <div className="max-w-lg mx-auto text-center space-y-8">
        <div className="space-y-3" style={fadeInUpStyle(visible, 0)}>
          <h2 className="text-3xl font-bold text-white" style={{ fontFamily: "Cinzel, serif" }}>
            Ready to play?
          </h2>
          <p className="text-sm text-white/40">
            Connect your wallet and place your first bet in under a minute.
          </p>
        </div>

        <div style={fadeInUpStyle(visible, 80)}>
          <Link
            to={ROUTES.GAME}
            className="inline-block px-12 py-5 rounded-xl bg-gold text-surface font-bold text-lg hover:bg-gold-light transition-colors duration-150 active:scale-[0.98]"
            style={{ fontFamily: "Cinzel, serif", letterSpacing: "0.04em" }}
          >
            Start playing →
          </Link>
        </div>

        <div style={fadeInUpStyle(visible, 140)}>
          <LandingTopWin />
        </div>

        <div className="pt-4 space-y-4" style={fadeInUpStyle(visible, 200)}>
          <p className="label-caps">Contract details</p>
          <ContractInfo />
        </div>

        <div className="flex justify-center" style={fadeInUpStyle(visible, 260)}>
          <LandingSocialLinks />
        </div>
      </div>
    </section>
  );
}
