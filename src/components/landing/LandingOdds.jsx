import GameOddsPanel from "../ui/GameOddsPanel";
import SectionHeading from "../ui/SectionHeading";
import CardSuitLegend from "../ui/CardSuitLegend";
import LandingPayoutFormula from "./LandingPayoutFormula";
import LandingWinRateCallout from "./LandingWinRateCallout";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle } from "../../utils/animation";

export default function LandingOdds() {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="px-6 py-16 border-t border-white/5">
      <div className="max-w-2xl mx-auto space-y-10">
        <div style={fadeInUpStyle(visible, 0)}>
          <SectionHeading
            title="The odds"
            subtitle="Simple game, transparent math."
          />
        </div>

        <div style={fadeInUpStyle(visible, 60)}>
          <LandingWinRateCallout />
        </div>

        <div className="grid sm:grid-cols-2 gap-8 items-start" style={fadeInUpStyle(visible, 120)}>
          <div className="space-y-6">
            <p className="text-sm text-white/50 leading-relaxed">
              You pick one of three suits. The contract draws one at random on-chain. If
              they match — you win 3× your stake. If they don't — you lose your stake.
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Every draw is settled transparently. Verify any outcome yourself on the
              Stacks Explorer.
            </p>
            <CardSuitLegend />
          </div>
          <div className="space-y-4">
            <GameOddsPanel />
            <LandingPayoutFormula />
          </div>
        </div>
      </div>
    </section>
  );
}
