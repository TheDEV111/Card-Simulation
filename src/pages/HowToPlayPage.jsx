import PageHeader from "../components/ui/PageHeader";
import HowToPlayCard from "../components/ui/HowToPlayCard";
import FAQAccordion from "../components/ui/FAQAccordion";
import GameOddsPanel from "../components/ui/GameOddsPanel";
import CardSuitLegend from "../components/ui/CardSuitLegend";
import ContractInfo from "../components/ui/ContractInfo";
import SectionHeading from "../components/ui/SectionHeading";
import { WIN_ODDS, WIN_MULTIPLIER } from "../utils/constants";
import { Link } from "react-router-dom";
import { ROUTES } from "../utils/routes";

const CONCEPTS = [
  { icon: "⛓", title: "On-chain randomness", body: "The contract uses Stacks block data to determine the drawn suit. No off-chain oracle, no server — just the blockchain." },
  { icon: "🔒", title: "Non-custodial", body: "Your STX stays in your wallet until the contract call confirms. We never hold your funds." },
  { icon: "⚡", title: "Atomic settlement", body: "Win or lose, your result and payout are settled in a single transaction. There is no second step." },
  { icon: "🔍", title: "Verifiable", body: "Every game has a transaction ID. You can verify any outcome on the Stacks Explorer by looking at the contract call." },
];

export default function HowToPlayPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-12">
      <PageHeader title="How to Play" subtitle="Everything you need to know before your first bet." />

      {/* Steps */}
      <section className="space-y-6">
        <SectionHeading title="The game loop" subtitle="Four steps between you and a payout." />
        <HowToPlayCard />
      </section>

      {/* Odds */}
      <section className="space-y-6">
        <SectionHeading title="The odds" subtitle="Transparent maths, every time." />
        <div className="grid sm:grid-cols-2 gap-6">
          <GameOddsPanel />
          <div className="space-y-4">
            <CardSuitLegend />
            <div className="panel p-5 space-y-3">
              <p className="label-caps">Payout formula</p>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-white/60">stake</span>
                <span className="text-white/30">×</span>
                <span className="text-gold font-bold text-xl" style={{ fontFamily: "Cinzel, serif" }}>{WIN_MULTIPLIER}</span>
                <span className="text-white/30">=</span>
                <span className="text-win font-semibold">payout</span>
              </div>
              <p className="text-xs text-white/30">
                Win odds are {Math.round(WIN_ODDS * 100)}% — one out of three suits matches.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Concepts */}
      <section className="space-y-6">
        <SectionHeading title="Key concepts" subtitle="What makes this game different." />
        <div className="grid sm:grid-cols-2 gap-4">
          {CONCEPTS.map((c) => (
            <div key={c.title} className="panel p-5 space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-xl">{c.icon}</span>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>{c.title}</p>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contract */}
      <section className="space-y-4">
        <SectionHeading title="The contract" subtitle="Read the code before you play." />
        <ContractInfo />
      </section>

      {/* FAQ */}
      <section className="space-y-6">
        <SectionHeading title="FAQ" subtitle="Common questions answered." />
        <FAQAccordion />
      </section>

      {/* CTA */}
      <div className="text-center py-6">
        <Link to={ROUTES.GAME} className="btn-primary inline-block px-10 max-w-xs mx-auto">
          Start playing →
        </Link>
      </div>
    </div>
  );
}
