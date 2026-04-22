import { useScrollReveal } from "../../hooks/useScrollReveal";
import { fadeInUpStyle, staggerDelay } from "../../utils/animation";

const FEATURES = [
  {
    icon: "⛓",
    title: "On-chain provably fair",
    desc: "Every result is executed and stored on the Stacks blockchain. Verify any outcome in seconds.",
  },
  {
    icon: "⚡",
    title: "Instant settlement",
    desc: "Winnings are paid within the same transaction. No waiting, no withdrawal delays.",
  },
  {
    icon: "🔒",
    title: "Non-custodial",
    desc: "Your funds never leave your wallet until the contract call is confirmed. We hold nothing.",
  },
  {
    icon: "🎯",
    title: "Simple game loop",
    desc: "Pick a card, set a stake, play. Three suits, one draw, 33% odds every round.",
  },
];

export default function LandingFeatures() {
  const [ref, visible] = useScrollReveal({ threshold: 0.1 });

  return (
    <section ref={ref} className="px-6 py-16 border-t border-white/5">
      <div className="max-w-2xl mx-auto space-y-8">
        <p className="label-caps text-center" style={fadeInUpStyle(visible, 0)}>Why this game</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {FEATURES.map((f, i) => (
            <div
              key={f.title}
              className="panel p-5 space-y-2 hover:border-gold/20 transition-colors duration-200"
              style={fadeInUpStyle(visible, 60 + i * 60)}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{f.icon}</span>
                <p className="text-sm font-semibold text-white" style={{ fontFamily: "Cinzel, serif" }}>
                  {f.title}
                </p>
              </div>
              <p className="text-xs text-white/40 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
