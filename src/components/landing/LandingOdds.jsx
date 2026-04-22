import GameOddsPanel from "../ui/GameOddsPanel";
import SectionHeading from "../ui/SectionHeading";
import CardSuitLegend from "../ui/CardSuitLegend";

export default function LandingOdds() {
  return (
    <section className="px-6 py-16 border-t border-white/5">
      <div className="max-w-2xl mx-auto space-y-10">
        <SectionHeading
          title="The odds"
          subtitle="Simple game, transparent math."
        />
        <div className="grid sm:grid-cols-2 gap-8 items-start">
          <div className="space-y-6">
            <p className="text-sm text-white/50 leading-relaxed">
              You pick one of three cards. The contract draws one of three. If
              they match — you win 2× your stake. If they don't — you lose
              your stake.
            </p>
            <p className="text-sm text-white/50 leading-relaxed">
              Every draw is settled on-chain. You can verify every outcome
              yourself on the Stacks Explorer.
            </p>
            <CardSuitLegend />
          </div>
          <GameOddsPanel />
        </div>
      </div>
    </section>
  );
}
