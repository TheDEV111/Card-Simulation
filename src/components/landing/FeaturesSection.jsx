const FEATURES = [
  { icon: "🔗", title: "On-chain",       body: "Every draw is executed by a Clarity smart contract on Stacks mainnet. No servers, no manipulation." },
  { icon: "⚡", title: "Instant",         body: "Results are finalized in the same block as your transaction. No waiting, no uncertainty." },
  { icon: "🛡️", title: "Non-custodial",   body: "Your wallet, your keys. We never hold your STX — the contract pays you directly on win." },
  { icon: "📊", title: "Transparent",     body: "All odds, payouts, and house edge are published on-chain. Nothing is hidden." },
  { icon: "🏆", title: "Competitive",     body: "Climb the global leaderboard, earn badges, and compete for weekly STX bonuses." },
  { icon: "🎯", title: "Simple rules",    body: "Pick a suit, stake STX, match the draw. 33% chance to win 3× your stake." },
];

export default function FeaturesSection({ className = "" }) {
  return (
    <section className={`py-16 px-6 ${className}`}>
      <div className="max-w-3xl mx-auto space-y-10">
        <h2
          className="text-3xl font-bold text-white text-center"
          style={{ fontFamily: "Cinzel, serif" }}
        >
          Why play here
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f) => (
            <div key={f.title} className="space-y-2">
              <span className="text-2xl">{f.icon}</span>
              <h3 className="text-sm font-semibold text-white/80">{f.title}</h3>
              <p className="text-xs text-white/40 leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
